import { DataSource } from '@angular/cdk/collections';
import { CdkTable } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface LineaDetalle {
  detalle?: string,
  ia?: number,
  comercial?: number,
  operativo?: number,
  consenso?: number,
  api?: boolean,
}

const ELEMENT_DATA: LineaDetalle[] = [
  {
    detalle: 'Consequat reprehenderit aliqua reprehenderit quis ea dolore in.',
    ia: 1,
    comercial: null,
    operativo: 3,
    consenso: 4,
    api: false,
  },
  {
    detalle: 'Veniam sit aliquip ipsum amet eu dolore sint consequat.',
    ia: 2,
    comercial: 2,
    operativo: 3,
    consenso: 4,
    api: false,
  },
  {
    detalle: 'Esse est sint dolore duis exercitation magna et ea sunt quis et velit id esse.',
    ia: null,
    comercial: 2,
    operativo: 3,
    consenso: 4,
    api: false,
  },
];

@Component({
  selector: 'ngx-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @ViewChild(CdkTable) cdkTable: CdkTable<LineaDetalle>
  displayedColumns: string[] = ['detalle', 'ia', 'comercial', 'operativo', 'consenso', 'acciones'];
  dataSource = new InitDataSource();
  mainForm: FormGroup;
  secondaryForm: FormGroup
  iaTotal;
  comercialTotal;
  operativoTotal;
  consensoTotal;

  constructor(
    private formBuilder: FormBuilder,
    public dialogService: NbDialogService,
  ) { }

  get lineas() {
    return this.secondaryForm.get('lineas') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.calcularHorasTotales();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  /**
   * @description calcula el total de horas de las columnas y las asigna en variables.
   */
  calcularHorasTotales() {
    const iaCells = this.lineas.controls.map((row) => Number(row.get('ia')?.value));
    const comercialCells = this.lineas.controls.map((row) => Number(row.get('comercial')?.value));
    const operativoCells = this.lineas.controls.map((row) => Number(row.get('operativo')?.value));
    const consensoCells = this.lineas.controls.map((row) => Number(row.get('consenso')?.value));
    this.iaTotal = iaCells.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    this.comercialTotal = comercialCells.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    this.operativoTotal = operativoCells.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    this.consensoTotal = consensoCells.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  }

  initForm() {
    this.mainForm = this.formBuilder.group({
      oportunidad: [''],
      descripcion: [''],
    });
    this.secondaryForm = this.formBuilder.group({
      lineas: this.formBuilder.array([])
    })
    this.dataSource.data.value.forEach((row) => {
      this.pushLinea(row);
    });
    this.lineas.valueChanges.subscribe(() => {
      this.calcularHorasTotales();
      this.cdkTable.renderRows();
      this.lineas.controls.forEach((row) => {
        row.get('ia')?.valueChanges.subscribe(() => {
          this.calcularConsenso(row);
        });
        row.get('comercial')?.valueChanges.subscribe(() => {
          this.calcularConsenso(row);
        });
        row.get('operativo')?.valueChanges.subscribe(() => {
          this.calcularConsenso(row);
        });
      });
    });


  }

  onClickMejorarLinea(element) {
    console.log(element.value);
  }

  deleteLinea(data) {
    this.lineas.removeAt(data?.index);
  }

  pushLinea(obj?: LineaDetalle) {
    const formGroupRow = this.formBuilder.group({
      detalle: [{ value: obj?.detalle || '', disabled: false }],
      ia: [{ value: obj?.ia || 0, disabled: true }],
      comercial: [{ value: obj?.comercial || 0, disabled: false }],
      operativo: [{ value: obj?.operativo || 0, disabled: false }],
      consenso: [{ value: 0, disabled: true }],
      api: [{ value: obj?.api || false, disabled: false }],
    });
    this.lineas.push(formGroupRow);
  }

  calcularConsenso(row) {
    if (!row) {
      return 0;
    }
    let count = 0
    row?.ia > 0 ? count++ : null;
    row?.operativo > 0 ? count++ : null;
    row?.comercial > 0 ? count++ : null;
    const consenso = Number((row?.ia + row?.operativo + row?.comercial) / count).toFixed(2);
    return consenso;
  }

  onClickProcesar() {
    console.log('onClickProcesar', this.mainForm.controls, this.mainForm.value)
  }

  onClickGuardarLineas() {
    console.log('onClickGuardarLineas', this.secondaryForm);
    console.log('this.dataSource', this.dataSource.data.value);
    console.log('ELEMENT_DATA', ELEMENT_DATA);
    console.log('this.lineas.controls', this.lineas.controls);
    console.log('this.lineas.controls', this.lineas.value);
  }

  sumarFilaSeleccionada(rowIndex: number, row) {
    console.log('sumarFilaSeleccionada', rowIndex, row)
    // const filaSeleccionada = ELEMENT_DATA[rowIndex];
    // const suma = Number(filaSeleccionada.ia) + Number(filaSeleccionada.comercial) + Number(filaSeleccionada.operativo);
    // return suma;
  }

  calcularConsensoForRow(row: FormGroup): number {
    const iaValue = row.get('ia')?.value || 0;
    const comercialValue = row.get('comercial')?.value || 0;
    const operativoValue = row.get('operativo')?.value || 0;


    // Calcular el promedio de los valores de ia, comercial y operativo
    const promedio = (iaValue + comercialValue + operativoValue) / 3;

    // Ajustar a 2, 1 o 0 según corresponda
    if (iaValue === 0 || comercialValue === 0 || operativoValue === 0 ||
      isNaN(promedio) || !isFinite(promedio)) {
      return 0;
    } else if (promedio >= 2) {
      return 2;
    } else if (promedio >= 1) {
      return 1;
    } else {
      return 0;
    }
  }

}

export class InitDataSource extends DataSource<LineaDetalle> {
  data = new BehaviorSubject<LineaDetalle[]>(ELEMENT_DATA);

  connect(): Observable<LineaDetalle[]> {
    return this.data;
  }

  disconnect() { }
}

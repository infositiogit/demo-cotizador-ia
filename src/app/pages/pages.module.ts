import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbInputModule, NbMenuModule, NbRadioModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { BlankComponent } from './blank/blank.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    NbRadioModule,
    NbInputModule,
    NbButtonModule,
    CdkTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PagesComponent,
    BlankComponent,
  ],
})
export class PagesModule {
}

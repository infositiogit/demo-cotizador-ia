import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      🦍️ <b><a href="https://github.com/MarkoDotCom" target="_blank">MSGB</a></b> - Infositio, 2023
    </span>
    <div class="socials">
      <a href="https://github.com/MarkoDotCom/demo-cotizador-ia" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}

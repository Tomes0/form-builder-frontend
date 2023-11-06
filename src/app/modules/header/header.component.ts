import { Component } from '@angular/core';
import {FormService} from "../../core/services/form.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public formsService: FormService
  ) { }

  selectForm(formCode: any) {
    this.formsService.getFormByCode(formCode.value);
  }
}

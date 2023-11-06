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

  initNewForm() {
    // TODO actually implement it
    console.log("new form to be made");
  }

  deleteForm(form: {name: string, value: string}) {
    // TODO needs to be implemented
    console.log(form);
  }
}

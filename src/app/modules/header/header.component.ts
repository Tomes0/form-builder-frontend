import { Component } from '@angular/core';
import {HeaderService} from "../../core/services/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public headerService: HeaderService,
  ) { }

  selectForm(formCode: any) {
    this.headerService.getFormByCode(formCode.value);
  }

  initNewForm() {
    this.headerService.createNewForm();
  }

  deleteForm(form: {name: string, code: string}) {
    this.headerService.deleteForm(form);
  }

  saveForm(){
    this.headerService.saveForm();
  }
}

import { Component } from '@angular/core';
import {FormCrudService} from "../../core/services/form-crud.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public formsService: FormCrudService,
  ) { }

  selectForm(formCode: any) {
    this.formsService.getFormByCode(formCode.value);
  }

  initNewForm() {
    this.formsService.createNewForm();
  }

  deleteForm(form: {name: string, code: string}) {
    this.formsService.deleteForm(form);
  }
}

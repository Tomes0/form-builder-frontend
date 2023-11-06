import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map} from "rxjs";

@Component({
  selector: 'app-create-new-form-dialog',
  templateUrl: './create-new-form-dialog.component.html',
  styleUrls: ['./create-new-form-dialog.component.scss']
})
export class CreateNewFormDialogComponent {
  @Output() newFormName = new EventEmitter<string>();

  formName = new FormControl<string>('',{nonNullable: true});
  formNameValueChange$ = this.formName.valueChanges.pipe(
    map(name => name.toUpperCase().replace(/ /g, '_'))
  );

  constructor() { }
}

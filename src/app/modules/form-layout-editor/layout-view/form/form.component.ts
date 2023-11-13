import {Component, Input} from '@angular/core';
import {Form} from "../../../../shared/interfaces/Form";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  @Input() form!: Form;


  constructor() { }

}

import { Component, OnInit } from '@angular/core';
import {FormsService} from "../../core/services/forms.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  selectedForm!: string;
  constructor(
    public formsService: FormsService
  ) { }

  ngOnInit(): void {
  }

}
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Message} from "../../../../assets/messages";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent  {
  @Output() confirm = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: Message
  ) { }
}

import {Injectable} from "@angular/core";
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog/confirm-dialog.component";
import {Messages} from "../../../assets/messages";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class DialogService {

  constructor(
    private matDialog: MatDialog,
  ) {}

  openDeleteFormDialog() {
    return this.matDialog.open(ConfirmDialogComponent, {data: Messages.FORM_DELETE_WARNING});
  }
}

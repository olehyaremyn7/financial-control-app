import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-authorization-modal',
  templateUrl: './authorization-modal.component.html',
  styleUrls: ['./authorization-modal.component.scss']
})

export class AuthorizationModalComponent {

  constructor(public dialog: MatDialog) { }

  closeDialog() {
    this.dialog.closeAll();
  }
}

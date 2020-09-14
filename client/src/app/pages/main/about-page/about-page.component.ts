import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactModalComponent} from "./contact-modal/contact-modal.component";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})

export class AboutPageComponent {

  constructor(public dialog: MatDialog) { }

  openContactDialog() {
    this.dialog.open(ContactModalComponent);
  }
}

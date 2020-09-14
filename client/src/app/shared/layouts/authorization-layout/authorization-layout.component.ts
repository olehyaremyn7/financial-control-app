import {Component, OnInit} from '@angular/core';
import {AuthorizationModalComponent} from "../../components/authorization-modal/authorization-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-authorization-layout',
  templateUrl: './authorization-layout.component.html',
  styleUrls: ['./authorization-layout.component.scss']
})

export class AuthorizationLayoutComponent implements OnInit {

  date: Date;

  links = [
    { url: '/login', name: 'Login' },
    { url: '/registration', name: 'Registration' },
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  openDialog() {
    this.dialog.open(AuthorizationModalComponent);
  }
}

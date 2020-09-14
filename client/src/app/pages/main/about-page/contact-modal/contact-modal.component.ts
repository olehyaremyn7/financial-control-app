import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../shared/services/alert.service";
import {Feedback} from "../../../../shared/interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})

export class ContactModalComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private alert: AlertService,
              private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      message: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    const feedback: Feedback = {
      name: this.form.value.name,
      email: this.form.value.email,
      message: this.form.value.message
    }

    this.http.post<Feedback>('/api/about/message', feedback).subscribe(
      response => {
        this.alert.success(response.message)
        this.submitted = false;
        this.form.enable();
      },
      error => {
        this.alert.danger(error.error.message);
        this.form.enable();
      },
      () => {
        this.form.reset();
        this.dialog.closeAll();
      }
    )
  }
}

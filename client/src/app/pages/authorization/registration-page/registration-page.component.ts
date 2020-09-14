import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../shared/services/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {Subscription} from "rxjs";
import {User} from "../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})

export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  registerSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.registerSubscription = this.authorizationService.registration(user).subscribe(() => {
        this.router.navigate([''], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        this.alert.danger(error.error.message);
        this.form.enable();
      })
  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}

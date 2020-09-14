import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthorizationService} from "../../../shared/services/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {User} from "../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  loginSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['notLogin']) {
        this.alert.danger('No authorization')
      } else if (params['registered']) {
        this.alert.success('Now you can sing in')
      } else if (params['authFailed']) {
        this.alert.warning('Sign in again')
      }
    })

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

    this.loginSubscription = this.authorizationService.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/accounts']);
        this.submitted = false;
      },
      error => {
        this.alert.danger(error.error.message)
        this.form.enable();
        this.submitted = false;
      }
    )
  }

  ngOnDestroy() {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}

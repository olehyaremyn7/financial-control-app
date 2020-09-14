import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../../../../shared/services/account.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Account} from "../../../../shared/interfaces/interfaces";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-new-account-page',
  templateUrl: './new-account-page.component.html',
  styleUrls: ['./new-account-page.component.scss']
})

export class NewAccountPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isNew = true;
  account: Account;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountsService: AccountService,
              private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      balance: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    });

    this.form.disable();
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.accountsService.getById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      account => {
        if (account) {
          this.account = account;
          this.form.patchValue({
            title: account.title,
            balance: account.balance
          })
        }
        this.form.enable();
      }, error => { this.alert.danger(error.error.message) }
    )
  }

  submit() {
    let observable$;

    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    const account: Account = {
      title: this.form.value.title,
      balance: this.form.value.balance
    }

    if (this.isNew) {
      observable$ = this.accountsService.create(account);
    } else {
      observable$ = this.accountsService.update(
        this.account._id, account
      )
    }

    observable$.subscribe(
      account => {
        this.account = account;
        if (this.isNew) {
          this.alert.warning('New account created');
          this.form.enable();
        } else {
          this.alert.warning('Changes saved');
          this.form.enable();
        }
      },
      error => {
        this.alert.danger(error.error.message);
        this.form.enable();
      }
    )
    this.router.navigate(
      ['/accounts']
    );
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../../shared/services/account.service";
import {Observable, Subscription} from "rxjs";
import {Account} from "../../../shared/interfaces/interfaces";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})

export class AccountsPageComponent implements OnInit, OnDestroy {

  accounts$: Observable<Account[]>
  accountsSubscription: Subscription;

  constructor(private accountService: AccountService,
              private alert: AlertService) { }

  ngOnInit() {
    this.accounts$ = this.accountService.fetch();
  }

  remove(id: string, title: string) {
    const decision = window.confirm(`Do you want to delete the account ${title}?`);

    if (decision) {
      this.accountsSubscription = this.accountService.remove(id).subscribe(
        response => this.alert.success(response.message),
        error => this.alert.danger(error.error.message),
        () => this.accounts$ = this.accountService.fetch()
      )
    }
  }

  ngOnDestroy() {
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Account} from "../../../shared/interfaces/interfaces";
import {AccountService} from "../../../shared/services/account.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})

export class AccountPageComponent implements OnInit {

  account$: Observable<Account>

  constructor(private accountsService: AccountService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.account$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            return this.accountsService.getById(params['id'])
          }
          return of(null)
        }
      )
    )
  }

}

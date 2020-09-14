import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TransactionModalComponent} from "./transaction-modal/transaction-modal.component";
import {TransactionService} from "../../../../shared/services/transaction.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Filter, Transaction} from "../../../../shared/interfaces/interfaces";
import {AlertService} from "../../../../shared/services/alert.service";

const STEP = 2;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {

  transactions: Transaction[] = [];
  transactionSubscription: Subscription;
  accountId: string;
  isExpenseModal = false;
  isProfitModal = false;
  isExpense = 'Expense';
  isFilter = false;
  offset: number = 0;
  limit = STEP;
  loading = false;
  reloading = false;
  noTransactions = false;
  newFilter: Filter = {};

  constructor(public dialog: MatDialog,
              private transactionService: TransactionService,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    this.accountId = this.route.snapshot.paramMap.get('id');

    const transactionParams = Object.assign({}, this.newFilter, {
      offset: this.offset,
      limit: this.limit
    });

    this.transactionSubscription = this.transactionService.fetch(this.accountId, transactionParams).subscribe(
      transactions => {
        this.transactions = this.transactions.concat(transactions);
        this.noTransactions = transactions.length < STEP;
        this.loading = false;
        this.reloading = false;
      },
      error => this.alert.danger(error.error.message)
    )
  }

  openExpenseDialog() {
    this.isExpenseModal = true;
    this.dialog.open(TransactionModalComponent, {
      data: { accountId: this.accountId, expense: this.isExpenseModal }
    });
  }

  openProfitDialog() {
    this.isProfitModal = true;
    this.dialog.open(TransactionModalComponent, {
      data: { accountId: this.accountId, profit: this.isProfitModal }
    });
  }

  apply(filter: Filter) {
    this.transactions = [];
    this.offset = 0;

    if (filter.transaction === 'Expense') {
      if (filter.appointment === 'No appointment') {
        filter.appointment = ''
      }
      filter.source = ''
      this.newFilter = filter;
    }

    if (filter.transaction === 'Profit') {
      filter.appointment = ''
      this.newFilter = filter;
    }

    if (filter.appointment) {
      if (filter.appointment === 'No appointment') {
        filter.appointment = ''
      }
      filter.source = ''
      this.newFilter = filter;
    }

    if (filter.source) {
      filter.appointment = ''
      this.newFilter = filter;
    }

    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.newFilter).length !== 0;
  }

  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TransactionService} from "../../../../../shared/services/transaction.service";
import {AlertService} from "../../../../../shared/services/alert.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Appointment, Source, Transaction} from "../../../../../shared/interfaces/interfaces";
import {Subscription} from "rxjs";
import {SourceService} from "../../../../../shared/services/source.service";

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})

export class TransactionModalComponent implements OnInit, OnDestroy {

  appointment: Appointment[] = [
    { value: 'Uncategorized', viewValue: 'Uncategorized', iconValue: 'cancel' },
    { value: 'Groceries', viewValue: 'Groceries', iconValue: 'shopping_basket' },
    { value: 'Auto & Transport', viewValue: 'Auto & Transport', iconValue: 'directions_bus' },
    { value: 'Clothing & Footwear', viewValue: 'Clothing & Footwear', iconValue: 'local_mall' },
    { value: 'House', viewValue: 'House', iconValue: 'home' },
    { value: 'Cafes & Restaurants', viewValue: 'Cafes & Restaurants', iconValue: 'restaurant' },
    { value: 'Entertainment', viewValue: 'Entertainment', iconValue: 'casino' },
    { value: 'Vacation', viewValue: 'Vacation', iconValue: 'beach_access' },
    { value: 'Health', viewValue: 'Health', iconValue: 'healing' },
    { value: 'Gadgets', viewValue: 'Gadgets', iconValue: 'photo_camera' },
    { value: 'Cell', viewValue: 'Cell', iconValue: 'settings_cell' },
  ]

  source: Source[] = [];

  formExpense: FormGroup;
  formProfit: FormGroup;
  submitted = false;
  showPrice: number;
  type: string;
  transactionSubscription: Subscription;
  arr: any = [];
  sourceSelect = 'No source';

  constructor(private router: Router,
              private transactionService: TransactionService,
              private sourceService: SourceService,
              private alert: AlertService,
              @Inject(MAT_DIALOG_DATA) public accountId: any,
              @Inject(MAT_DIALOG_DATA) public expense: any,
              @Inject(MAT_DIALOG_DATA) public profit: any,
              @Inject(MAT_DIALOG_DATA) public transaction: any,
              @Inject(MAT_DIALOG_DATA) public editProfit: any,
              @Inject(MAT_DIALOG_DATA) public editExpense: any,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getSources();
    this.formExpense = new FormGroup({
      priceExpense: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ]),
      appointmentExpense: new FormControl(null, [
        Validators.required
      ]),
      dateExpense: new FormControl(null),
      noteExpense: new FormControl(null, [
        Validators.required
      ])
    });

    this.formProfit = new FormGroup({
      priceProfit: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ]),
      sourceProfit: new FormControl(null, [
        Validators.required
      ]),
      dateProfit: new FormControl(null),
      noteProfit: new FormControl(null, [
        Validators.required
      ])
    })

    if (this.editExpense.editExpense) {
      this.formExpense.patchValue({
        priceExpense: this.transaction.transaction.price,
        appointmentExpense: this.transaction.transaction.appointment,
        dateExpense: this.transaction.transaction.date,
        noteExpense: this.transaction.transaction.note
      })
    }

    if (this.editProfit.editProfit) {
      this.formProfit.patchValue({
        priceProfit: this.transaction.transaction.price,
        sourceProfit: this.transaction.transaction.source,
        dateProfit: this.transaction.transaction.date,
        noteProfit: this.transaction.transaction.note
      })
    }
  }

  submitExpense() {
    let expenseTransaction$;

    if (this.formExpense.invalid) {
      return
    }

    this.formExpense.disable();
    this.submitted = true;

    if (this.expense.expense) {
      this.type = 'Expense'
    }

    const newExpenseTransaction: Transaction = {
      price: this.formExpense.value.priceExpense,
      appointment: this.formExpense.value.appointmentExpense,
      note: this.formExpense.value.noteExpense,
      account: this.accountId.accountId,
      date: this.formExpense.value.dateExpense,
      type: this.type
    }

    if (this.editExpense.editExpense) {
      expenseTransaction$ = this.transactionService.update(this.transaction.transaction._id, newExpenseTransaction);
    } else {
      expenseTransaction$ = this.transactionService.createExpense(newExpenseTransaction)
    }

    expenseTransaction$.subscribe(
      () => {
        if (this.editExpense.editExpense) {
          this.alert.success('Transaction updated');
          this.submitted = false;
          this.formExpense.enable();
        } else {
          this.alert.success('Transaction created');
          this.submitted = false;
          this.formExpense.enable();
        }
      },
      error => {
        this.alert.danger(error.error.message);
        this.formExpense.enable();
      },
      () => {
        this.formExpense.reset();
        this.dialog.closeAll();
        this.router.navigate(
          ['/account', this.accountId.accountId]
        );
      }
    )
  }

  submitProfit() {
    let profitTransaction$;

    if (this.formProfit.invalid) {
      return
    }

    this.formProfit.disable();
    this.submitted = true;

    if (this.profit.profit) {
      this.type = 'Profit'
    }

    const newProfitTransaction: Transaction = {
      price: this.formProfit.value.priceProfit,
      source: this.formProfit.value.sourceProfit,
      note: this.formProfit.value.noteProfit,
      account: this.accountId.accountId,
      date: this.formProfit.value.dateProfit,
      type: this.type
    }

    if (this.editProfit.editProfit) {
      profitTransaction$ = this.transactionService.update(this.transaction.transaction._id, newProfitTransaction);
    } else {
      profitTransaction$ = this.transactionService.createProfit(newProfitTransaction)
    }

    profitTransaction$.subscribe(
      () => {
        if (this.editProfit.editProfit) {
          this.alert.success('Transaction updated');
          this.submitted = false;
          this.formExpense.enable();
        } else {
          this.alert.success('Transaction created');
          this.submitted = false;
          this.formExpense.enable();
        }
      },
      error => {
        this.alert.danger(error.error.message);
        this.formExpense.enable();
      },
      () => {
        this.formExpense.reset();
        this.dialog.closeAll();
        this.router.navigate(
          ['/account', this.accountId.accountId]
        );
      }
    )
  }

  remove() {
    const decision = window.confirm(`Do you want to delete this transaction?`);

    if (decision) {
      this.transactionSubscription = this.transactionService.remove(this.transaction.transaction._id).subscribe(
        response => this.alert.success(response.message),
        error => this.alert.danger(error.error.message),
        () => {
          this.dialog.closeAll();
          this.router.navigate(
            ['/account', this.accountId.accountId]
          )
        }
      )
    }
  }

  getSources() {
    this.transactionSubscription = this.sourceService.fetch().subscribe(
      sources => {
        this.source = sources;
        this.source.splice(0, 0 ,{ value: '', viewValue: 'No source' });
        this.source.push({ value: '', viewValue: 'New source' });
      }
    )
  }

  newSource(value) {
    if (value === 'New source') {
      const newValue = prompt('Enter new source')
      const source = {
        value: newValue,
        viewValue: newValue
      }
      this.sourceService.create(source).subscribe(
        () => {
          this.source.splice(1, 0, source);
          this.alert.success('New source created');
        }, error => {
        this.alert.danger(error.error.message);
      }
      )
    }
  }

  removeSource(id: string) {
    const del = window.confirm(`Do you want to delete this source?`);

    if (del) {
      this.transactionSubscription = this.sourceService.remove(id).subscribe(
        response => {
          const findElement = this.source.find((item) => {
            return item._id === id
          });
          this.source.splice(1, 1, findElement)
          this.alert.success(response.message)
        },
        error => this.alert.danger(error.error.message),
        () => this.dialog.closeAll()
      )
    }
  }

  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }
}

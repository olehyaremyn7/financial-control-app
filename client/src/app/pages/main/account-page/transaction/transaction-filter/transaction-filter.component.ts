import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Appointment, Filter, Source} from "../../../../../shared/interfaces/interfaces";
import {SourceService} from "../../../../../shared/services/source.service";
import {Subscription} from "rxjs";

interface TransactionType {
  value: string
  viewValue: string
  iconValue: string
}

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})

export class TransactionFilterComponent implements OnInit, OnDestroy {

  type: TransactionType[] = [
    { value: 'Expense', viewValue: 'Expense', iconValue: 'money_off' },
    { value: 'Profit', viewValue: 'Profit', iconValue: 'attach_money' }
  ]

  appointment: Appointment[] = [
    { value: 'No appointment', viewValue: 'No appointment', iconValue: 'not_interested' },
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

  source: Source[] = []

  @Output() filter = new EventEmitter<Filter>()

  start: any
  end: any
  transaction: string
  appointmentSelect = this.appointment[0].value;
  sourceSelect = 'No source';
  sourceSubscription: Subscription;

  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    this.getSources();
  }

  submit() {
    const filter: Filter = {}

    if (this.transaction) {
      filter.transaction = this.transaction
    }

    if (this.appointmentSelect) {
      filter.appointment = this.appointmentSelect
    }

    if (this.sourceSelect) {
      filter.source = this.sourceSelect
    }

    if (this.start) {
      filter.start = this.start
    }

    if (this.end) {
      filter.end = this.end
    }

    this.filter.emit(filter)
  }

  getSources() {
    this.sourceSubscription = this.sourceService.fetch().subscribe(
      sources => {
        this.source = sources;
        this.source.splice(0, 0 ,{ value: '', viewValue: 'No source' });
      }
    )
  }

  ngOnDestroy() {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
  }
}

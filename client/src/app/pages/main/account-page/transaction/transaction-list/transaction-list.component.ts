import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../../shared/interfaces/interfaces";
import {TransactionModalComponent} from "../transaction-modal/transaction-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})

export class TransactionListComponent {

  @Input() accountId: string;
  @Input() transactions: Transaction[];

  isExpenseModal = false;
  isProfitModal = false;

  constructor(public dialog: MatDialog) { }

  openEditDialog(transaction: Transaction, type: string) {
    switch (type) {
      case "Profit":
        this.isProfitModal = true;
        this.dialog.open(TransactionModalComponent, {
          data: { accountId: this.accountId, editProfit: this.isProfitModal, transaction: transaction, profit: this.isProfitModal }
        });
        break;
      case "Expense":
        this.isExpenseModal = true;
        this.dialog.open(TransactionModalComponent, {
          data: { accountId: this.accountId, editExpense: this.isExpenseModal, transaction: transaction, expense: this.isExpenseModal }
        });
    }
  }

  icon(appointment: string) {
    switch (appointment) {
      case 'Gadgets': return 'photo_camera'
      case 'Cell': return 'settings_cell'
      case 'Health': return 'healing'
      case 'Vacation': return 'beach_access'
      case 'Entertainment': return 'casino'
      case 'Cafes & Restaurants': return 'restaurant'
      case 'House': return 'home'
      case 'Clothing & Footwear': return 'local_mall'
      case 'Auto & Transport': return 'directions_bus'
      case 'Groceries': return 'shopping_basket'
      case 'Uncategorized': return 'cancel'
    }
  }
}

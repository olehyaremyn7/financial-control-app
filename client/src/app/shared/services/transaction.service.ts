import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction, Message} from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})

export class TransactionService {

  constructor(private http: HttpClient) { }

  fetch(accountId: string, params: any = {}): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`/api/transaction/${accountId}`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  fetchSources(accountId: string): Observable<any> {
    return this.http.get<any>(`/api/transaction/${accountId}`)
  }

  createExpense(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`/api/transaction/expense`, transaction);
  }

  createProfit(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`/api/transaction/profit`, transaction);
  }

  update(id: string, transaction: Transaction): Observable<Transaction> {
    return this.http.patch<Transaction>(`/api/transaction/${id}`, transaction);
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/transaction/${id}`);
  }

}

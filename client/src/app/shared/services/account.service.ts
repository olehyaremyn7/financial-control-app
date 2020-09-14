import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account, Message} from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})

export class AccountService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Account[]> {
    return this.http.get<Account[]>('/api/account');
  }

  getById(id: string): Observable<Account[]> {
    return this.http.get<Account[]>(`/api/account/${id}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>('/api/account', account);
  }

  update(id: string, account: Account): Observable<Account> {
    return this.http.patch<Account>(`/api/account/${id}`, account);
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/account/${id}`);
  }
}

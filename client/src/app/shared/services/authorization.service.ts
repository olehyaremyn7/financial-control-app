import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  private token = null;

  constructor(private http: HttpClient) { }

  registration(user: User): Observable<User> {
    return this.http.post<User>('/api/authorization/registration', user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/authorization/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('secret-auth-token', token);
            this.setToken(token);
          }
        )
      )
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

  getToken(): string {
    return this.token
  }

  setToken(token: string) {
    this.token = token;
  }

}

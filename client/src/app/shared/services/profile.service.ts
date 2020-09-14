import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ProfileService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<User> {
    return this.http.get<User>('/api/profile');
  }

  create(name: string, image?: File): Observable<User> {
    const fordData = new FormData();

    if (image) {
      fordData.append('image', image, image.name)
    }

    fordData.append('name', name);

    return this.http.post<User>('/api/profile', fordData);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>('/api/profile', user);
  }

}

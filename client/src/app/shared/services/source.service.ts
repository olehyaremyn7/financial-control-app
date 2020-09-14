import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Source} from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})

export class SourceService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Source[]> {
    return this.http.get<Source[]>('/api/source');
  }

  create(source: Source): Observable<Source> {
    return this.http.post<Source>('/api/source', source);
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/source/${id}`);
  }
}

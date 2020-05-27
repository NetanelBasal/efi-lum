import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, share, shareReplay, tap } from 'rxjs/operators';

type User = { userId: number };

@Injectable({ providedIn: 'root' })
export class UserService {
  private user = new BehaviorSubject<User | null>(null);
  allUsers$: Observable<{ [id: number]: string }>;

  selectUser$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  getUser() {
    return this.user.getValue();
  }

  getUserId() {
    return this.user.getValue().userId;
  }

  create(name: string) {
    return this.http
      .post<User>(`${environment.baseUrl}/users`, { name })
      .pipe(tap(response => this.user.next(response)));
  }

  getUsers() {
    if (!this.allUsers$) {
      const toObject = users => {
        return users.reduce((acc, { id, name }) => {
          acc[id] = name;
          return acc;
        }, {});
      };

      // Use share() as both `getMessages` and `getRoomUsers` needs this information
      // and we want to make ONE request and share it
      this.allUsers$ = this.http
        .get<{ id: number; name: string }[]>(`${environment.baseUrl}/users`)
        .pipe(map(toObject), share());
    }

    return this.allUsers$;
  }
}

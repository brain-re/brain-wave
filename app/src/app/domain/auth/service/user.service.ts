import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { user } from 'src/app/logic/class/user.class';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: BehaviorSubject<user> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<user> {
    return this.http.get<user>(`${HTTP_API}/user/current`).pipe(
      tap((user: user) => this.currentUser.next(user)),
      switchMap(() => this.currentUser)
    );
  }
}

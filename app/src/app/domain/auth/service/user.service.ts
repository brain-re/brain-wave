import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { user } from 'src/app/logic/class/user.class';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$: BehaviorSubject<user> = new BehaviorSubject(null);
  private jwtService: JwtHelperService;
  constructor(private http: HttpClient, private authService: AuthService)
  {
    this.jwtService = new JwtHelperService();
    this.refreshUser();
  }

  public refreshUser(): void {
    this.authService.token$.pipe(
      tap((token) => this.currentUser$.next((token != null && token.isAuthenticated) ? this.jwtService.decodeToken(token.token) : null))
    ).subscribe()
  }
}

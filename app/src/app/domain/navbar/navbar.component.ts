import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { jwtToken } from '../auth/model/jwt-token.model';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user?:string = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.token$.pipe(
      tap((token: jwtToken) => this.user = token.token)
    ).subscribe()
  }

}

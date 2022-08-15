import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { jwtToken } from 'src/app/domain/auth/model/jwt-token.model';
import { AuthService } from 'src/app/domain/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  public user?:string = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.token$.pipe(
      tap((token: jwtToken) => this.user = token.token)
    ).subscribe()
  }

  ngOnDestroy(): void {}
}

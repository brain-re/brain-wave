import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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
      tap((token: string) => this.user = token)
    ).subscribe()
  }

  ngOnDestroy(): void {}
}

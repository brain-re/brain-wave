import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();
  public foo: string;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.http.get<string>('/api/sample/foo').subscribe(
      (response: string) => {
        this.foo = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-article-container',
  template: '<router-outlet></router-outlet>'
})
export class ArticleContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

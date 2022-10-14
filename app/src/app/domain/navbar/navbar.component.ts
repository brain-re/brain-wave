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
  animate(){
    const sidebar = document.querySelector('.sidebar')
    const sidebarActive = document.getElementById('active')

    //check the status of sidebar + animate
    if (sidebarActive === null){
      sidebar.setAttribute('id','active')
    }else{
      sidebar.setAttribute('id','notactive')
    }
  }
}
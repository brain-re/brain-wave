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
    //init background canvas
    const canvas = document.createElement('div')
    canvas.setAttribute('id', 'canvasBackground');
    //get elements
    const sidebar = document.querySelector('.sidebar')
    const sidebarActive = document.getElementById('active')
    const getCanvas = document.getElementById('canvasBackground')
    //check the status of sidebar + animate
    if (sidebarActive === null){
      sidebar.setAttribute('id','active')
      document.body.append(canvas)
      const getCanvas = document.getElementById('canvasBackground')
      getCanvas.style.cssText = 'position:absolute;width:100%;height:100%;top:0px;z-index:110;background-color:#000000;opacity:0.7;'
    }else{
      sidebar.setAttribute('id','notactive')
      getCanvas.style.cssText = ''
    }
  }
}
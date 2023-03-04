import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/app/logic/class/user.class';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from '../auth/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public user$:BehaviorSubject<user> = this.userService.currentUser$;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  public animate(){
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

  public userIsAuthenticated():boolean
  {
    return null !== this.user$.value;
  }
}

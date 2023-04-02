import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/app/logic/class/user.class';
import { CategoryService } from 'src/app/shared/services/category.service';
import { UserService } from '../auth/service/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ICategory } from 'src/app/logic/interfaces/category.interface';

const sidebar = trigger('sidebar', [
  state('notactive', style({
    transform: 'translateX(-100%)'
  })),
  state('active', style({
    transform: 'translateX(0)'
  })),
  transition('notactive <=> active', animate(100))
]);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    sidebar
  ]
})

export class NavbarComponent implements OnInit {
  public state = 'notactive';
  public inactiveElementCollapsibleSidebarClass = 'sidebar-element'; // An element with this class won't activate sidebar collapse
  public user$:BehaviorSubject<user> = this.userService.currentUser$;
  public categories$: BehaviorSubject<ICategory[]> = this.categorieService.categories$;

  @HostListener('window:click', ['$event'])
  onMouseClick(event: PointerEvent) {
    
    let el = event.target as Element

    // If the pointer event is not on a sidebar element,
    // then user have clicked outside of sidebar.
    if (!el.classList.contains(this.inactiveElementCollapsibleSidebarClass)) {
      if (this.state === 'active') {
        // So we want to collapse the sidebar if it is active.
        this.state = 'notactive'
      }
    }
  }

  constructor(
    private userService: UserService,
    private categorieService: CategoryService,
    private dec: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.state = 'notactive'
  }

  public animate(force?: string)
  {
    if (force !== undefined) {
      this.state = force;
    } else {
      this.state = this.state === 'notactive' ? 'active': 'notactive'    
    }    
  }

  public userIsAuthenticated():boolean
  {
    return null !== this.user$.value;
  }
}

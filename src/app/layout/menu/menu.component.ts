import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit , OnChanges{

  constructor(private router: Router,
              public authService: AuthService
  ) { }

  goTo() {
    return this.router.url == "/login"
  }

  isLogged(){
    return this.authService.isLogged()
  }



  ngOnInit(): void {
    this.authService.getUserData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.authService.getUserData()
  }

  logout(){
    this.authService.logout()
  }

}

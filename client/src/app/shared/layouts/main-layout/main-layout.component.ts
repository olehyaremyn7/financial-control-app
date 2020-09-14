import { Component } from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent {

  date: Date;

  links = [
    { url: '/profile', name: 'Profile' },
    { url: '/accounts', name: 'Accounts' },
    { url: '/about', name: 'About' },
  ];

  constructor(private authorizationService: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }

}

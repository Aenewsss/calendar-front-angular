import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkCurrentRouter();
      }
    });
  }

  title = 'calendar-app';

  currentRoute: boolean = false

  checkCurrentRouter() {
    const route = this.router.url;

    console.log(route)
    if (route === "/") this.currentRoute = true
    else this.currentRoute = false
  }
}

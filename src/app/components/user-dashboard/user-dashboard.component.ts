import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css','./assets/fonts/icomoon/style.css','./assets/css/style.css']
})
export class UserDashboardComponent implements OnInit {

  sidebarclass: string = "dashboard";
  toggleButtonClass: string = "burger js-menu-toggle";

  constructor() { }
  ngOnInit(): void {
  }

  togglesidebar(){
    if(this.sidebarclass == "dashboard"){
      this.sidebarclass = "dashboard show-sidebar";
      this.toggleButtonClass = "burger js-menu-toggle active";
    }
    else{
      this.sidebarclass="dashboard";
      this.toggleButtonClass = "burger js-menu-toggle";
    }
  }

}

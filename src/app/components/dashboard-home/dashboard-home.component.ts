import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../environments/environment';
import { UserService} from '../../services/user.service';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  user: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.user = this.userService.get()
      .subscribe((user)=>{
        this.user = user;
      },
      (error)=>{
        
      })
  }

  copyLink(link:any){
    link.select();  
    document.execCommand('copy');  
    link.setSelectionRange(0, 0);
  }

  createLink(){
    return environment.clientUrl + "portfolio/" + this.user.url;
  }
}

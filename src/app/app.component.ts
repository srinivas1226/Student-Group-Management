import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = true
  constructor(private router: Router,public CommonService: CommonService,private messageService: MessageService) {}
  navigate(page:String){
    try {
      if(page === 'login'){
        this.CommonService.logedPersonData = '';
        if(this.CommonService.logedPersonData != ''){
          this.messageService.add({key:'msgs',severity:'success', summary:'Success', detail:'User Has Logged out Successfuly'});
        }
        this.router.navigate(['/Login']);
      }else if(page === 'register'){
        this.router.navigate(['/Register']);
      }else if(page === 'studentTable'){
        this.router.navigate(['/TableList']);
      }else if(page === 'groupList'){
        this.router.navigate(['/GroupList']);
      }
    } catch (error) {
      console.error("Error in navigation",error);
    }
  }

}

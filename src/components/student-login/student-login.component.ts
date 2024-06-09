import { Component, OnInit,OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit,OnDestroy {

  constructor(public CommonService: CommonService,private router: Router,private messageService: MessageService) {}
  loginData = { email: '', password: '' };
  jsonData;
  ngOnInit(): void {
    this.CommonService.isLogin = true;
    this.CommonService.groupTable = false;
    this.CommonService.studentsTable = false;
    this.CommonService.isLoginBtn = false;
    this.CommonService.isLogoutBtn = false;
    this.CommonService.getFileData().subscribe(data => {
      this.jsonData = data;
      console.log(this.jsonData)
    });
  }

  ngOnDestroy(): void {
  }

  // For login please take example of json data which is in assets
  onSubmit(){
    try {
      let emailFound = false;
      if((this.loginData.email === '' || this.loginData.password === '' )|| (this.loginData.email === undefined || this.loginData.password === undefined )){
        this.messageService.add({severity:'error', summary:'Error Message', detail:'Please Fill all details'})
        return;
      }
      else{
        if(this.jsonData.length == 0){
          this.messageService.add({severity:'error', summary:'Error Message', detail:'Please Register YourSelf as there is no data peresent in DB'});
          return;
        }
        for(let i=0;i<this.jsonData.length;i++){
          if(this.jsonData[i].email === this.loginData.email){
            emailFound = true;
            if(this.jsonData[i].password === this.loginData.password){
              this.CommonService.logedPersonData = this.jsonData[i]['name'];
              this.messageService.add({key:'msgs',severity: 'success', summary: 'Success', detail: 'User Has Logged in Successfully' });
              this.router.navigate(['/GroupList']);
              break;
            }else{
              this.messageService.add({severity:'error', summary:'Error Message', detail:'Wrong password'})
              break;
            }
          }
        }
      }

      if (!emailFound) {
        this.messageService.add({severity:'error', summary:'Error Message', detail:'Wrong Email Address'})
        return;
      }
    } catch (error) {
      console.error("Error in onSubmit",error);
    }
  }

}

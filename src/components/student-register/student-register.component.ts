import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonService, Employee } from '../../services/common.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit,OnDestroy {

  constructor(public CommonService: CommonService,private router: Router,private messageService: MessageService) {}
  ngOnInit(){
    this.CommonService.groupTable = false;
    this.CommonService.studentsTable = false;
    this.CommonService.isLoginBtn = true;
    this.CommonService.isLogoutBtn = false;
    this.CommonService.isLogin = false;
  }
  employee: Employee = {} as Employee;

  onSubmit(){
    try {
      if((this.employee.name === '' || this.employee.address === '' || this.employee.phone === '' || this.employee.designation === '' || this.employee.email === '' || this.employee.photo === '' || this.employee.department === '' || this.employee.password === '' ) || ( this.employee.name == undefined || this.employee.address == undefined || this.employee.phone == undefined || this.employee.designation == undefined || this.employee.email == undefined || this.employee.photo == undefined || this.employee.department == undefined || this.employee.password == undefined ) ){
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all details.' });
        return;
      }else{
        this.CommonService.addStudent(this.employee).subscribe(response => {
          console.log(this.employee);
          this.messageService.add({key:'msgs',severity: 'success', summary: 'Success', detail: 'User Registered Successfully' });
          this.router.navigate(['/Login']);
        });
      }
    } catch (error) {
      console.error("Error in onSubmit",error);
    }
  }
  ngOnDestroy(): void {
      this.CommonService.isLoginBtn = false;
  }
}

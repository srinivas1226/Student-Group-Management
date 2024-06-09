import { Component, OnInit,OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonService,Employee } from '../../services/common.service';
import {
  CdkDragDrop,
  CdkDragStart,
  CdkDragEnd,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit,OnDestroy {
  students: any[] = [];
  cricketTeam: any[] = [];
  header: any[] = [];
  draggedRow;
  dragSource: string;
  dropTarget: string;
  private subscription: Subscription;

  constructor(public commonService: CommonService,private messageService: MessageService,private cdr: ChangeDetectorRef) {
    this.header = [
      { field: 'name', header: 'Name', width: '60px' },
      { field: 'address', header: 'Address', width: '80px' },
      { field: 'department', header: 'Department', width: '80px' },
    ];
  }

  ngOnInit(): void {
    console.log("OnInit")
    this.commonService.isLogoutBtn = true;
    this.commonService.isLogin = false;
    this.commonService.isLoginBtn = false;
    this.commonService.studentsTable = true;
    this.commonService.groupTable = false;
    // this.commonService.getStudentsList();
    // this.commonService.getCricketList()
    // this.getBroadcasterValues();
    this.commonService.getFilAlleData().subscribe((data) => {
      this.students = data.students;
      this.cricketTeam = data.cricketList;
    });
  }

  getBroadcasterValues(){
    try {
      this.subscription = this.commonService.serviceRecordProvider$.subscribe(
        result => {
          console.log(this.commonService.action,result);
          if (this.commonService.action === 'studentsData') {
            this.students = result;
            return;
          }
  
          else if (this.commonService.action == 'cricketData') {
            this.cricketTeam = result;
          }

          else if(this.commonService.action == 'deleteStudentRow') {
            this.commonService.getStudentsList;
          }
        },
        error => {
          console.error('error in the open dialog', error);
        },
        () => {
          this.subscription.unsubscribe();
        }
      ); 
    } catch (error) {
      console.error("Error in getBroadcasterValues",error);
    }
  }

  delete(index: number,rowData) {
    this.students.splice(index,1);
    // this.commonService.deleteStudentRow(rowData.id);
    // this.messageService.add({key:'msgs', severity: 'success', summary: 'Success', detail: 'Student user data deleted successfully' });
    // this.cdr.detectChanges(); 
  }

  



  dragStart(event: CdkDragStart, rowData: any,val) {
    this.draggedRow = rowData;
    this.dragSource = val;
  }

  dragEnd(event: CdkDragEnd, rowData: any,val) {
    console.log('dragEnd', val);
  }

  deleteFromCricketTeam(index: number,rowData) {
    this.cricketTeam.splice(index, 1);
    this.students.push(rowData)
    // this.commonService.deleteCricketRow(rowData.id,rowData);
    // this.messageService.add({key:'msgs', severity: 'success', summary: 'Success', detail: 'Cricket user data deleted successfully' });
  }

  tryDrop(event){
    console.log("drop",event)
  }

  drop(event: CdkDragDrop<any[]>,val) {
    try {
      // console.log('drop',this.draggedRow);
      // console.log(val,event)
      // this.dropTarget = val;
      // const previousContainerId = event.previousContainer.id;
      // const currentContainerId = event.container.id;
      // console.log('previousContainerId:',previousContainerId, 'currentContainerId:', currentContainerId);

      // console.log('dragSource:', this.dragSource, 'dropTarget:', this.dropTarget);
      if (this.draggedRow) {
        let index = this.findIndex(this.draggedRow,val);
        if(val === 'cricket'){
          this.students = [...this.students, this.draggedRow];
          this.cricketTeam = this.cricketTeam.filter((val, i) => i != index);
          // this.commonService.deleteCricketRow(this.draggedRow.id,this.draggedRow);
        }else{
          this.cricketTeam = [...this.cricketTeam, this.draggedRow];
          this.students = this.students.filter((val, i) => i != index);
          // this.commonService.deleteStudentRow(this.draggedRow.id,this.draggedRow)
        }
        this.draggedRow = null;
        // this.messageService.add({key:'msgs', severity: 'success', summary: 'Success', detail: 'Settings Saved Successfully.' });
      }
    } catch (error) {
      console.error("Error in drop",error);
    }
  }

  findIndex(rowData,val) {
    try {
      let index = -1;
      let tableData;
      if(val === 'cricket'){
        tableData = this.cricketTeam;
      }else{
        tableData = this.students;
      }
      for (let i = 0; i < tableData.length; i++) {
        if (rowData.name === tableData[i].name) {
          index = i;
          break;
        }
      }
      return index;
    } catch (error) {
        console.error("Error in findIndex",error);
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}




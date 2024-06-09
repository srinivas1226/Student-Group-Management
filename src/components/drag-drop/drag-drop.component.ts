import { Component, OnInit } from '@angular/core';
import { CommonService,Employee } from '../../services/common.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  constructor(public commonService: CommonService){ }
  available: Employee[] = []; 
  selected: Employee[] = []; 
  currentlyDragging: Employee | null = null;
  students: any[] = [];
  header: any[] = [];
  ngOnInit(): void {
    this.commonService.isLogoutBtn = true;
    this.commonService.isLogin = false;
    this.commonService.isLoginBtn = false;
    this.commonService.studentsTable = false;
    this.commonService.groupTable = true;
    this.header = [
      { field: 'name', header: 'Name' },
      { field: 'address', header: 'Address' },
      { field: 'phone', header: 'Phone' },
      { field: 'designation', header: 'Designation' },
      { field: 'email', header: 'Email' },
      { field: 'department', header: 'Department' },
    ];
    this.commonService.getFileData().subscribe((data) => {
      this.available = data;
      this.students = data;
    });
  }

  
    dragStart(person: Employee) { 
      this.currentlyDragging = person; 

      
  } 

  dragEnd() { 
      this.currentlyDragging = null; 
  } 
  drop() { 
    console.log("drop",this.currentlyDragging)
      if (this.currentlyDragging) { 
          let currentlyDraggingIndex = 
              this.findIndex(this.currentlyDragging); 
          this.selected = 
              [...this.selected, this.currentlyDragging]; 
          this.available = 
              this.available.filter((val, i) => i != 
                  currentlyDraggingIndex); 
          this.currentlyDragging = null; 
      } 
  } 
 
  findIndex(person: Employee) { 
      let index = -1; 
      for (let i = 0; i < this.available.length; i++) { 
          if (person.id === this.available[i].id) { 
              index = i; 
              break; 
          } 
      } 
      return index; 
  }
  
  drag(event: CdkDragDrop<Employee[]>) {
    moveItemInArray(this.students, event.previousIndex, event.currentIndex);
  }

  delete(index){
    this.students.splice(index,1)
    // console.log("Data",this.students);
  }

}

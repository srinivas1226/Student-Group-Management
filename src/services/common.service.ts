import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export interface Employee {
  id: string;
  name: string;
  address: string;
  phone: string;
  designation: string;
  email: string;
  photo: string;
  department: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLogin = false;
  isLogoutBtn = false;
  isLoginBtn = false;
  studentsTable = false;
  groupTable = false;
  logedPersonData = '';
  isAlert = false;
  alertMessage = '';
  action = '';
  private serviceBroadcaster = new Subject<any>();
  serviceRecordProvider$ = this.serviceBroadcaster.asObservable();
  private apiUrl = 'http://localhost:3000/students';
  private apiCricketUrl = 'http://localhost:3000/cricketList';

  constructor(private http: HttpClient,private router: Router) { }
  getFilAlleData(): Observable<any> {
    return this.http.get<any[]>('/assets/json/students.json');
  }

  getFileData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCricketData(): Observable<any> {
    return this.http.get<any[]>(this.apiCricketUrl);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  addCricket(student: any): Observable<any> {
    return this.http.post<any>(this.apiCricketUrl, student);
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  deleteCricket(id: number): Observable<any> {
    const url = `${this.apiCricketUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  goToHome(){
    try {
      this.router.navigate(['/Home']);
    } catch (error) {
      console.error("Error in goToHome",error);
    }
  }

  getStudentsList(){
    try {
      let DataSubcription = this.getFileData()
        .subscribe(
          result => {
            this.action = 'studentsData';
            this.serviceBroadcaster.next(result);
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error('Error in getStudentsList', error);
    }
  }

  getCricketList(){
    try {
      let DataSubcription = this.getCricketData()
        .subscribe(
          result => {
            this.action = 'cricketData';
            this.serviceBroadcaster.next(result);
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error('Error in getCricketList', error);
    }
  }

  deleteStudentRow(id,rowData?){
    try {
      let DataSubcription = this.deleteStudent(id)
        .subscribe(
          result => {
            this.action = 'deleteStudentRow';
            if(rowData != undefined){
              this.addCricketRow(rowData)
            }
            // this.serviceBroadcaster.next(result);
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error('Error in deleteStudentRow', error);
    }
  }

  deleteCricketRow(id,rowData){
    try {
      let DataSubcription = this.deleteCricket(id)
        .subscribe(
          result => {
            console.log("Delete cricket row",rowData);
            this.addStudentRow(rowData)
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error("Error in deleteCricketRow");
    }
  }

  addStudentRow(rowData){
    try {
      let DataSubcription = this.addStudent(rowData)
        .subscribe(
          result => {
            console.log("added student row");
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error("Error in addStudentRow",error);
    }
  }

  addCricketRow(rowData){
    try {
      let DataSubcription = this.addCricket(rowData)
        .subscribe(
          result => {
            console.log("added cricket row");
          },
          error => {
          },
          () => {
            DataSubcription.unsubscribe();
          });
    } catch (error) {
      console.error("Error in addStudentRow",error);
    }
  }

}

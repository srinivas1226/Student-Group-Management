import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentRegisterComponent } from '../components/student-register/student-register.component';
import { StudentLoginComponent } from '../components/student-login/student-login.component';
import { StudentTableComponent } from '../components/student-table/student-table.component';
import { MainComponent } from '../components/main/main.component';
import { DragDropComponent } from 'src/components/drag-drop/drag-drop.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  // { path: 'Home', component: MainComponent },
  { path: 'Register', component: StudentRegisterComponent },
  { path: 'GroupList', component: StudentTableComponent },
  { path: 'Login', component: StudentLoginComponent },
  { path: 'TableList', component: DragDropComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

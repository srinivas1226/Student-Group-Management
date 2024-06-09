import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {}
  navigation(page:String){
    try {
      if(page === 'login'){
        this.router.navigate(['/Login']);
      }else{
        this.router.navigate(['/Register']);
      }
    } catch (error) {
      console.error("Error in navigation",error);
    }
  }

  ngOnInit(): void {
  }

}

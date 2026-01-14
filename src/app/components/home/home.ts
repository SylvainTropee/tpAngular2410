import { Component } from '@angular/core';
import {User} from '../../services/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {

  constructor(private userService : User, private router : Router) {
  }

  login(){
    this.userService.login("Michel")
    this.goToSummary()
  }

  goToSummary(){
    this.router.navigate(["/summary"]);
  }

}

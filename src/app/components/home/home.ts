import { Component } from '@angular/core';
import {User} from '../../services/user';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {

  userLogin: string = "";
  password: string = "";
  errors : string[] = [];

  constructor(private userService : User, private router : Router) {
  }

  login(){

    this.errors = [];

    if(this.userLogin?.trim().length < 3){
      this.errors.push("L'identifiant doit avoir au moins 3 caractères")
    }

    if(this.password?.trim().length < 6){
      this.errors.push("Le mot doit avoir au moins 6 caractères")
    }

    if(this.errors.length == 0){
      this.userService.login(this.userLogin)
      this.goToSummary()
    }
  }

  goToSummary(){
    this.router.navigate(["/summary"]);
  }

}

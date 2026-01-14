import { Component } from '@angular/core';
import {Nav} from '../nav/nav';
import {User} from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [
    Nav
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {

  public username : string;

  constructor(private userService : User) {
    this.username = this.userService.getUsername()
  }

}

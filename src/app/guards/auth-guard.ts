import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {User} from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(User)
  const router = inject(Router)

  if (userService.isLogged()) {
    return true;
  } else {
    router.navigate([''])
    return false;
  }
};

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  currentUser: string;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getCurrentCustomer();
  }

  logOut() {
    this.localStorageService.deleteToken();
    this.localStorageService.removeCurrentCustomer();
    this.localStorageService.removeCurrentUserId();
    window.location.reload();
  }

  isLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }


}

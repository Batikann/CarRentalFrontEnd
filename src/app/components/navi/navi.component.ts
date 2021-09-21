import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationClaim } from 'src/app/models/operationClaim';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  currentUser: string;
  userId: string;
  claims: OperationClaim[] = [];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getCurrentCustomer();
    this.userId = this.localStorageService.getCurrentUserId();
    this.getClaim(parseInt(this.userId));
  }

  logOut() {
    this.localStorageService.deleteToken();
    this.localStorageService.removeCurrentCustomer();
    this.localStorageService.removeCurrentCustomerEmail();
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

  getClaim(userId: number) {
    this.userService.getClaimByUserId(userId).subscribe((response) => {
      this.claims = response.data;
    });
  }

  isAdmin() {
    for (let i = 0; i < this.claims.length; i++) {
      if (this.claims[i].name == 'admin') {
        return true;
      }
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/TokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  addToken(token: TokenModel) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiration', token.expiration);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  addCurrentCustomer(user: User) {
    localStorage.setItem('currentUser', user.firstName + ' ' + user.lastName);
  }

  getCurrentCustomer() {
    return localStorage.getItem('currentUser');
  }

  removeCurrentCustomer() {
    localStorage.removeItem('currentUser');
  }

  addCurrentUserId(user: User) {
    localStorage.setItem('currentUserId', user.userId.toString());
  }

  getCurrentUserId() {
    return localStorage.getItem('currentUserId');
  }

  removeCurrentUserId() {
    return localStorage.removeItem('currentUserId');
  }
}

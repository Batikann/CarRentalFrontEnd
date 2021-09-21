import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RentalDetail } from '../models/rentalDetail';
import { TokenModel } from '../models/TokenModel';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  user: string = 'user';
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

  addCurrentCustomerEmail(user: User) {
    localStorage.setItem('currentUserEmail', user.email);
  }

  getCurrentCustomerEmail() {
    localStorage.getItem('currentUserEmail');
  }

  removeCurrentCustomerEmail() {
    localStorage.removeItem('currentUserEmail');
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

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  getUser(): UserDto {
    return JSON.parse(localStorage.getItem(this.user)!);
  }

  addRental(rentalModel: RentalDetail) {
    localStorage.setItem('rentalModel', JSON.stringify(rentalModel));
  }

  getRental() {
    return JSON.parse(localStorage.getItem('rentalModel'));
  }

  removeRental() {
    localStorage.removeItem('rentalModel');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44325/api/customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'getcustomersdetails';
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerDetailsById(
    customerId: number
  ): Observable<SingleResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'getcustomerdetailsbyid?id=' + customerId;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerById(
    customerId: number
  ): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getcustomerbyid?id=' + customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(
    userId: number
  ): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getcustomerbyuserid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
}

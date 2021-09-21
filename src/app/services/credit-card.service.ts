import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = 'https://localhost:44325/api/';
  constructor(private httpClient: HttpClient) {}

  getAllByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    let newPath =
      this.apiUrl + 'creditcards/getallbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getAll(): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getall';
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getById(id: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'creditcards/add';
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  delete(creditCard: CreditCard): Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/delete';
    return this.httpClient.post<SingleResponseModel<CreditCard>>(newPath, creditCard);
  }
}

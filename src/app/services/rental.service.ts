import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44325/api/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getrentalsall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailsByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<RentalDetail>> {
    let newPath =
      this.apiUrl + 'getrentaldetailsbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailsByCarId(
    carId: number
  ): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'getrentaldetailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  addRental(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/addrental';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  endRental(
    rental: RentalDetail
  ): Observable<SingleResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/endrental';
    return this.httpClient.post<SingleResponseModel<RentalDetail>>(
      newPath,
      rental
    );
  }

  checkRentalDates(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/checkaviabledate';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentalCarControl(carId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/getcarcontrol?id=' + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

  isCarAvailable(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/iscaravailable';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  checkCarRentalStatus(rental: RentalDetail): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'checkcarrentalstatus';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}

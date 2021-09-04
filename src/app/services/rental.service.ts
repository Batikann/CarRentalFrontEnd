import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

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
  addRental(rental:RentalDetail){
    let newPath=this.apiUrl+"rentals/addrental";
    this.httpClient.post(newPath,rental);

  }

  checkRentalDates(rental:RentalDetail):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/checkaviabledate"
    return this.httpClient.post<ResponseModel>(newPath,rental);

  }

  getRentalCarControl(carId:number):Observable<ResponseModel>{
   let newPath=this.apiUrl+'rentals/getcarcontrol?id='+carId;
   return this.httpClient.get<ResponseModel>(newPath);
  }
}

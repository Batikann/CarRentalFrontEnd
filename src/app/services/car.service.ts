import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44325/api/';
  constructor(private httpClient: HttpClient) {}

  getAllCarDto(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getcarsdetails';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/addcar',
      car
    );
  }
  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/updatecar',
      car
    );
  }

  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/deletecar',
      car
    );
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsByColorId(
    colorId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getcarsbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getcarsbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDto(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getcardetails?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarByIdSingle(
    carId: number
  ): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandAndColorId(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      this.apiUrl +
      'cars/getcarsbybrandandcolorid?brandid=' +
      brandId +
      '&colorid=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsDto(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getcarbyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}

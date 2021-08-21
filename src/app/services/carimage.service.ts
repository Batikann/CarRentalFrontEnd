import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl="https://localhost:44325/api/";
  constructor(private htttpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
     let newPath=this.apiUrl+"CarImages/getallcarsimage";
     return this.htttpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImages/getlistbycarid?id="+carId;
    return this.htttpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}

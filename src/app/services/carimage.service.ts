import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  add(image:FormData):Observable<SingleResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImages/addcarimage";
   return this.htttpClient.post<SingleResponseModel<CarImage>>(newPath,image)
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImages/getlistbycarid?id="+carId;
    return this.htttpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}

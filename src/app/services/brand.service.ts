import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44325/api/brands/';
  constructor(private httpClinet: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getbrandsall';
    return this.httpClinet.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClinet.post<ResponseModel>(this.apiUrl + 'addbrand', brand);
  }
}

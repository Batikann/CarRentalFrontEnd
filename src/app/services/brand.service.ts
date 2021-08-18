import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandResponseModel } from '../models/brandResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44325/api/brands/getbrandsall';
  constructor(private httpClinet: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClinet.get<BrandResponseModel>(this.apiUrl);
  }
}

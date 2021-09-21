import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/TokenModel';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44325/api/users/';
  constructor(private httpClient: HttpClient) {}

  getUserByMail(mail: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getuserbymail?mail=' + mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserById(userId:number):Observable<SingleResponseModel<UserDto>>{
        let newPath=this.apiUrl+"getuserbyid?id="+userId;
        return this.httpClient.get<SingleResponseModel<UserDto>>(newPath);
  }

  getClaimByUserId(
    userId: number
  ): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'getbyuserclaim?userId=' + userId;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  update(userUpdatModel: UserDto): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'editprofile';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      userUpdatModel
    );
  }
}

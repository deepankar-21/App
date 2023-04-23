import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  httpUrl = '';

  constructor(private http: HttpClient, private auth: AuthenticationService) { 
    this.httpUrl = this.auth.main_httpUrl;
  }
  profileImageUrl;
  codeValueTechObj = {};
  accountImageUrl;
  accInfo = {}
  codeValueShowObj = {};

  dateformatchange(date) {
    if (date == null || date == undefined) {
      return "";
    }
    var datear1 = date.split('T')[0]
    var datearr = datear1.split("-")
    return datearr[2] + '/' + datearr[1] + '/' + datearr[0]
  }
  async getFields(obj) {
    const res = await this.http.get<any>(this.httpUrl + '/metadata/fields/getfields' + obj).toPromise().then(res => {
      return res;
    });
    return res;

  }
  async getCodeValue(b_acct_id) {
    const resp = await this.http.get<any>(this.httpUrl + '/metadata/codeValue/getCodeValues' + b_acct_id).toPromise().then(res => {
      return res;
    });
    return resp;
  }
}

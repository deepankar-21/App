import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = environment.API_URL;
  
  userLogin(req: any){
   // return this.http.post(`${this.API_URL}login`,req);
  }

  userRegister(req: any){
  //  return this.http.post(`${this.API_URL}register`,req);
  }

  //login_with_password = environment.loginWithPassword || false;

  httpUrl;
  main_httpUrl;
  profile_data = ''


  apiProtocol = 'https';
  uiHost = ''; apiHost = '';
  apiPort = 3000;

  constructor(private http: HttpClient) {

    this.uiHost = window.location.hostname;
    if (this.uiHost == 'preprod.vda.erpupda.co.in') {
      this.httpUrl = "https://preprod.vda.erpupda.co.in:3010/portal";
      this.main_httpUrl = "https://preprod.vda.erpupda.co.in:3010";
      //this.login_with_password = true;
    } else if (this.uiHost == 'vda.upda.co.in') {
      this.httpUrl = "https://vda.upda.co.in:3010/portal";
      this.main_httpUrl = "https://vda.upda.co.in:3010";
     // this.login_with_password = false;
    }else if (this.uiHost == 'vda.erpupda.co.in') {
      this.httpUrl = "https://vda.upda.co.in:3010/portal";
      this.main_httpUrl = "https://vda.upda.co.in:3010";
      //this.login_with_password = false;
    } else {
      this.httpUrl = "http://localhost:3010/portal";
      this.main_httpUrl = "http://localhost:3010";
    //  this.login_with_password = false;
    }

    console.log("Api is listing on :--"+this.main_httpUrl)
  }
  // async signUp(obj) {
  //   const resp = await this.http.post<any>(this.httpUrl + '/signup', obj).toPromise().then(res => {
  //     return res;
  //   });
  //   return resp;

  // }
  // async login(obj) {
  //   const resp = await this.http.post<any>(this.httpUrl + '/login', obj).toPromise().then(res => {
  //     return res;
  //   });
  //   return resp;

  // }

  async loginWithPhoneNumber(obj) {
    const resp = await this.http.post<any>(this.httpUrl + '/loginWithPhoneNumber', obj).toPromise().then(res => {
      return res;
    });
    return resp;

  }

  async getDataFromMobileNumberOrEmail(obj) {
    const resp = await this.http.get<any>(this.httpUrl + '/getDataFromMobileNumberOrEmail' + obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }

  async sendMsg(mobile, otp) {
    var str = "https://2factor.in/API/V1/" + this.api_key + "/SMS/" + mobile + "/AUTOGEN"
    const resp = await this.http.get<any>(str).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  api_key = 'f5b33455-838a-11ea-9fa5-0200cd936042';
  async verifyMsg(otp_entered_by_user, session_id) {
    var str = "https://2factor.in/API/V1/" + this.api_key + "/SMS/VERIFY/" + session_id + "/" + otp_entered_by_user
    const resp = await this.http.get<any>(str).toPromise().then(res => {
      return true
    }).catch(err => {
      return false
    });
    return resp;
  }
}

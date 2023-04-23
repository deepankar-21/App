import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from './main.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  httpUrl;
  constructor(private http: HttpClient, private main: MainService) {
    this.httpUrl = this.main.httpUrl + "/hr";
   }

  async getsalaryData(obj) {
    const resp = await this.http.post<any>(this.httpUrl + '/payroll_info/bill/getPaySlipPrint' ,obj).toPromise().then(res => {
      return res;
    });
    return resp;
  }
  // async getsalaryData(obj) {
  //   const resp = await this.http.post<any>(this.httpUrl + '/payroll_info/bill/getaccuraldata' ,obj).toPromise().then(res => {
  //     return res;
  //   });
  //   return resp;
  // }
}

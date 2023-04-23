import { Component, OnInit } from '@angular/core';
import { ItrService } from '../services/itr.service';

@Component({
  selector: 'app-itr',
  templateUrl: './itr.page.html',
  styleUrls: ['./itr.page.scss'],
})
export class ItrPage implements OnInit {

  erpUser;
  b_acct_id;
  constructor(private itr:ItrService) { }

  ngOnInit() {
    this.erpUser = JSON.parse(localStorage.getItem('erpUser'));
    this.b_acct_id = this.erpUser.b_acct_id
  }
  itrObj = {};

   year = [
    { label: " 2021-2022", value: "2021" },
    { label: " 2022-2023", value: "2022" },
    { label: " 2023-2024", value: "2023" },
    { label: " 2024-2025", value: "2024" },
    { label: " 2025-2026", value: "2025" },
    { label: " 2026-2027", value: "2026" },
    { label: " 2027-2028", value: "2027" },
    { label: " 2028-2029", value: "2028" },
    { label: " 2029-2030", value: "2029" },
    
  ];

  async getITRData(){
    this.itrObj['b_acct_id'] = this.b_acct_id;
    this.itrObj['emp_id'] = this.erpUser.emp_id;
   console.log(this.itrObj)
   let resp = await this.itr.getITRData(this.itrObj);
  
   if (resp['error'] == false) {
    console.log(resp)
    } else {
    alert("Error in getting All Bill")
  }
  }

}

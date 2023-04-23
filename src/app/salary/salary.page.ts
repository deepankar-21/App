import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { SalaryService } from '../services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.page.html',
  styleUrls: ['./salary.page.scss'],
})
export class SalaryPage implements OnInit {
  erpUser;
  b_acct_id;
  constructor(private salary:SalaryService) { }

  ngOnInit() {
    this.erpUser = JSON.parse(localStorage.getItem('erpUser'));
    this.b_acct_id = this.erpUser.b_acct_id
  }
  salaryObj = {};
   year = [
    { label: " 2021", value: "2021" },
    { label: " 2022", value: "2022" },
    { label: " 2023", value: "2023" },
    { label: " 2024", value: "2024" },
    { label: " 2025", value: "2025" },
    { label: " 2026", value: "2026" },    
    { label: " 2027", value: "2027" },
    { label: " 2028", value: "2029" },
    { label: " 2029", value: "2030" },
  ];

   month = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  async getsalaryData(){
   this.salaryObj['b_acct_id'] = this.b_acct_id;
   //this.salaryObj['emp_id'] = this.erpUser.emp_id;
   console.log(this.salaryObj)
   let resp = await this.salary.getsalaryData(this.salaryObj);
  
   if (resp['error'] == false) {
    console.log(resp)
    } else {
    alert("Error in getting All Bill")
  }
  }

}

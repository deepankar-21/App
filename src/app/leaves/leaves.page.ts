import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
})
export class LeavesPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.leave_flag = true
  }

  leaveObj = {};
  applyLeaveObj = {};
  leave_flag:boolean;
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

   leavetype = [
    { label: ' Casual Leave', value: 'CL' },
    { label: 'Earn Leave', value: 'EL' },
    { label: ' Maternity Leave', value: 'ML' }, 
    { label: ' Medical Leave', value: ' MD' }, 
  ];

  view(){
      console.log(this.leaveObj)
  }
  apply(){
   console.log(this.applyLeaveObj)
  }
}

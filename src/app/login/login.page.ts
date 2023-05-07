import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  constructor(private http: HttpClient,private router: Router,private fb:FormBuilder, private auth:AuthenticationService) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  erpUserData = {};
  b_acct_id = 28;
  otp1= false;
  otp_flag: boolean = false;
  otp: number;
  obj = {};
  session_id = {};
  allowLogin;
  profileData;
  ipAddress;
  async ngOnInit() {
    this.otp1= false;
    await this.getIPAddress()
  }

  change(event: any){
    this.screen = event;
  }

  otp11(){
    this.otp1 = true;
  }

  async getIPAddress() {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
      //this.login_obj['login_ip'] = this.ipAddress;
    });
  }

resp_otp = {}
  async sendOtp() {
   this.allowLogin = false
    this.obj['work_phone_no'] = this.obj['mobile_number']
    var valid_mob = this.validatePhoneNumber(this.obj['work_phone_no'])
    if (valid_mob == true) {
      //this.spinner.show()
      var resp = await this.auth.loginWithPhoneNumber(this.obj);
      if (resp['error'] == false) {
        //this.spinner.hide()
        this.allowLogin = true
        this.otp_flag = true
        this.otp = 123456;
        this.erpUserData = resp['data']
        
        this.resp_otp['Status'] = 'Success'
       // this.resp_otp = await this.auth.sendMsg(this.obj['mobile_number'], this.otp);
        if (this.resp_otp['Status'] == 'Success') {
          this.otp_flag = true;
          this.session_id = this.resp_otp['Details']
          await this.getProfileData(this.erpUserData['b_acct_id'], this.obj['mobile_number']);
        alert("Otp Generated Successfully");
        } else {
          //this.spinner.hide()
        }

      } else if (resp['error'] == true) {
        // this.spinner.hide()
        alert(resp['data'])
      }
      else {
        // this.spinner.hide()
        alert("Some Error Occured")
      }
    } else {
      // this.spinner.hide()
      // Swal.fire('Warning...', 'Invalid Mobile Number', 'warning')
      alert("Invalid Mobile Number")
    }
  }

  login(){
    //var formData: any = new FormData();
    // if(this.formData.valid){
    //   this.isLoading = true
    //   formData.append('email', this.formData.get('email').value);
    //   formData.append('password', this.formData.get('password').value);
    //   console.log(this.formData)
    //   this.auth.userLogin(formData).subscribe((data:any)=>{
    //     console.log(data);
    //   });
    // }  
  }

  async LoginWithOtp() {
    //this.spinner.hide()
    if(this.resp_otp['Status'] != 'Success'){
    if (this.allowLogin == true) {
      // if (this.otp == this.obj['otp']) {
      if (await this.auth.verifyMsg(this.obj['otp'], this.session_id)) {
        localStorage.setItem('erpUser', JSON.stringify(this.erpUserData));
        alert("Login Successfully")
        this.router.navigate(['/dashboard']);
      } else {
       alert("Otp Do Not Matched")
      }
    } else {
      alert("Invalid Credentials")
    }
  }

    localStorage.setItem('erpUser', JSON.stringify(this.erpUserData));
        alert("Login Successfully")
        this.router.navigate(['/dashboard']);

  }

  // register(){
  //   var formData: any = new FormData();
    // if(this.formData.valid){
    //   this.isLoading = true
    //   formData.append('name', this.formData.get('name').value);
    //   formData.append('email', this.formData.get('email').value);
    //   formData.append('password', this.formData.get('password').value);
    //   console.log(this.formData)
    //   this.auth.userRegister(formData).subscribe((data:any)=>{
    //     console.log(data);
    //   });
    // }  
  //}

  async getProfileData(b_acct_id: any, key: any) {
    let obj2 = new Object();
    obj2['b_acct_id'] = b_acct_id;
    obj2['key'] = key
    var resp2 = await this.auth.getDataFromMobileNumberOrEmail(JSON.stringify(obj2));
    if (resp2['error'] == false) {
      this.auth.profile_data = resp2.data;
      console.log("profiledata",resp2.data)
      this.profileData = resp2.data
      if (resp2.data.length == 0) {
        this.erpUserData['Designation'] = resp2.data[0]['designation_code'];
        this.erpUserData['Designation_for_header'] = resp2.data[0]['designation_code'];
        this.erpUserData['User_name'] = resp2.data[0]['emp_name'];
      }
else{
  this.erpUserData['Designation'] = resp2.data[0]['designation_code'];
  this.erpUserData['Designation_for_header'] = resp2.data[0]['designation_code'];
  this.erpUserData['User_name'] = resp2.data[0]['emp_name'];
  this.erpUserData['DOB'] = resp2.data[0]['emp_dob'];
  this.erpUserData['emp_id'] = resp2.data[0]['emp_id'];
  this.erpUserData['mobile'] = resp2.data[0]['emp_phone_no'];
  this.erpUserData['email'] = resp2.data[0]['emp_email'];
  this.erpUserData['retirement_age'] = resp2.data[0]['retirement_age'];
  this.erpUserData['retirement_date'] = resp2.data[0]['retirement_date'];
  this.erpUserData['emp_permanent_addr_city'] = resp2.data[0]['emp_permanent_addr_city'];
  let UserData = this.erpUserData
  localStorage.setItem("UserData", JSON.stringify(UserData))
}
    }
  }


  validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(input_str);
  }
  validateEmail(input_str) {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/im;
    return re.test(input_str);
  }

}

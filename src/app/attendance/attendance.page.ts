import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Console } from 'console';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  constructor(private geolocation: Geolocation,public photoService: PhotoService) { }
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  today;
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

 async ngOnInit() {
   this.today = new Date().toISOString().slice(0, 10)
   await  this.getCurrentCoordinates()
  }
 PunchIn(){

 }
 Mark(){

 }
 PunchOut(){
   
 }
  // use geolocation to get user's device coordinates
  async getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("latitude",this.latitude)
      console.log("longitude",this.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

addPhotoToGallery() {
  this.photoService.addNewToGallery();
  }
}

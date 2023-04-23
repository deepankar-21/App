import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'heart' },
    { title: 'Salary', url: '/salary', icon: 'at' },
    { title: 'ITR', url: '/itr', icon: 'cellular' },
    { title: 'Leaves', url: '/leaves', icon: 'receipt' },
    { title: 'Attendance', url: '/attendance', icon: 'stopwatch' },
    { title: 'View Attendance', url: '/view-attendance', icon: 'eye' }
  ];
 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 erpUser;
 menu;
  constructor(private router:Router,public menuCtrl: MenuController, private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
    ) {  
         
  }
  
  ngOnInit() {
    
   // this.menu.enable(false);
    this.erpUser = JSON.parse(localStorage.getItem('erpUser'));
    // console.log(this.erpUser['b_acct_id'],this.erpUser)
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  logout(){
    //this.menu.enable(false);

    // this.menuCtrl.close();
    // localStorage.clear();
    // App.exitApp();
      this.router.navigate(['/login'])
  }
backs=this.platform.backButton.subscribeWithPriority(-1, () => {
  if (!this.routerOutlet.canGoBack()) {
    App.exitApp();
}
});
}

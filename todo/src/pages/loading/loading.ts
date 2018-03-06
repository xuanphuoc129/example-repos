import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { HomePage } from '../home/home';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(
    private appCtrl : AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  subcrible : Subscription;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    this.loadData();
    this.subcrible = this.appCtrl.loadedDataChanel.asObservable().subscribe(()=>{
      console.log("Load data done");
      if(this.appCtrl.loaddata.dataFile && this.appCtrl.loaddata.dataStorage){
        this.navCtrl.setRoot(HomePage);
      }
    })

  }

  ionViewDidLeave(){
    if(this.subcrible){
      this.subcrible.unsubscribe();
    }
  }

  loadData(){

    this.appCtrl.loadDataFromJSON();
    this.appCtrl.getData();

  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ToDo } from '../home/home';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { ToDos } from '../../providers/class/ToDo';

/**
 * Generated class for the DoneTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-done-task',
  templateUrl: 'done-task.html',
})
export class DoneTaskPage {
  listFillter: Array<ToDos> = [];

  constructor(
    public mModalController: ModalController,
    public appController : AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.listFillter = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoneTaskPage');
    this.loadData();
  }
  loadData(){
    // this.listFillter = this.appController.getFakeData();
    this.listFillter = this.appController.data.filter(data=>{
      return data.state;
    })
  }

  goToDetail(item){
    this.appController.showModal("TodoDetailPage",{todo: item});
  }

}

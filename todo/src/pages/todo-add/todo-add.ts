import { Component,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { convertToView } from 'ionic-angular/navigation/nav-util';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Icons, ToDos} from '../../providers/class/ToDo';
import { Untils } from '../../providers/untils/untils';

/**
 * Generated class for the TodoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-add',
  templateUrl: 'todo-add.html',
})
export class TodoAddPage {
  @ViewChild("taContainer") taContainer : ElementRef;
  icons : Array<Icons> = [];
  date : string = "";
  time : string = "00:00";
  todo : ToDos ;
  indexIconActive : number = 0;
  constructor(
    public appController : AppControllerProvider,
    public mRenderer2 : Renderer2,
    public mViewController: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    let now = new Date();
    this.date = this.appController.convertDate(now);
    this.time = this.appController.convertTime(now);
    console.log(this.time);
    
    this.indexIconActive = 0;
    this.todo = new ToDos();
  }

  selectedIcon(i){
    this.indexIconActive = i;
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoAddPage');
    this.loadIcons();
  }

  loadIcons(){
    this.icons = [];
    this.icons = this.appController.getIcons();
  }

  closeView(){
    this.mRenderer2.addClass(this.taContainer.nativeElement,"slideOutRight");
    setTimeout(() => {
      this.mViewController.dismiss();
    }, 200);
  }

  add(){
    if(!this.todo.name || this.todo.name.length == 0 || this.todo.name == ""){
      this.closeView();
      return;
    }
    this.appController.showLoading();
    this.todo.icon = this.icons[this.indexIconActive].icon;
    this.todo.color= this.icons[this.indexIconActive].color;
   
    let time = new Date(this.date);
    time.setHours(parseInt(this.time.split(":")[0]) , parseInt(this.time.split(":")[1]));
    this.todo.date = new Date(this.date);
    this.todo.time = time;
    this.todo.state = false;
    this.todo.dateString = this.todo.date.getDate() +" "+ Untils.getMonthString(this.todo.date);
    this.todo.timeString = this.time;
    this.todo.createID();
    console.log("Todo create new",this.todo);
    
    this.appController.data.push(this.todo);
    this.appController.saveData(this.appController.data);
    this.appController.hideLoading();
    this.appController.showToast("Add new task success",1000);
    this.closeView();
  }

}

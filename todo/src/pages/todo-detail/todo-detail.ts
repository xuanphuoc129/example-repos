import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPopAnchor, ViewController } from 'ionic-angular';
import { ToDo } from '../home/home';
import { ToDos } from '../../providers/class/ToDo';

/**
 * Generated class for the TodoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.html',
})
export class TodoDetailPage {
  todo: ToDos;
  constructor(
    public mViewController: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    
    this.todo = new ToDos();
    if(navParams.data["todo"]){
      this.todo = navParams.get("todo");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoDetailPage');
    console.log(this.todo);
    
  }
  closeView(){
    this.mViewController.dismiss();
  }

  checkDone(){
    this.todo.state = true;
    
  }
}

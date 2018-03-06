import { Component } from '@angular/core';
import { NavController, DateTime, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Untils } from '../../providers/untils/untils';
import { ToDos } from '../../providers/class/ToDo';
import { DayInMonth } from '../../providers/class/DayInMonth';

export interface ToDo {
  /**Biểu tượng của công việc */
  icon: string;
  /**Màu tượng trưng*/
  color: string;
  /**Tên công việc */
  name: string;
  /**Mô tả công việc cần làm */
  description: string;
  /**Ngày thực hiện */
  date: Date;
  /**Giờ thực hiện */
  time: Date;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listFillter: Array<ToDos> = [];
  isCalendarMode: boolean = false;
  checked: boolean = true;
  title: string = "To do";
  today : Date ;
  dayInMonth : number = 30;
  daySelected : number = 0;
  listDayInMonth: Array<DayInMonth> = [];
  constructor(
    public appController: AppControllerProvider,
    public mModalController: ModalController,
    public navCtrl: NavController) {
    this.listFillter = [];
    this.listDayInMonth = [];
    this.title = "to do";
    this.isCalendarMode = false;
    this.checked = false;
    this.ischeckMarkMode = false;
    this.today = new Date();
    this.dayInMonth = Untils.getDayInMonth(this.today);
    this.daySelected = 3;
  }

  loadDayInMonth(){
    let mm = this.today.getMonth() + 1;
    let yy = this.today.getFullYear();  
    this.listDayInMonth = [];
    for (let index = 1; index <= this.dayInMonth; index++) {
      let day = new DayInMonth();
      let date = new Date();
      date.setDate(index);
      day.parse(date);
      this.listDayInMonth.push(day);
    }
  }

  ischeckMarkMode: boolean = false;
  checkMarkMode() {
    this.ischeckMarkMode = !this.ischeckMarkMode;
    this.loadCheckAll();
  }

  loadCheckAll(){
    let check = this.listFillter.find(todo=>{
      return todo.state;
    })
    if(check && check.state){
      this.isCheckAll = true;
    }
    else{
      this.isCheckAll = false;
    }
  }

  changeCalendarMode() {
    // this.appController.clearData();
    this.isCalendarMode = !this.isCalendarMode;
    
  }

  getMonthString(date: Date): string {
    return Untils.getMonthString(date);
  }

  ionViewDidEnter() {
    // this.appController.clearData();
    this.listFillter = this.appController.loadData();
    this.loadDayInMonth();
    this.loadCheckAll();
    console.log("Load done");
    
  }

  goToDoneTask() {
    // this.appController.clearData();
    this.navCtrl.push("DoneTaskPage");

  }
  /**Đánh dấu hoặc huỷ toàn bộ đánh dấu */
  isCheckAll: boolean = false;
  checkAllDone() {
    if (!this.isCheckAll) {
      this.appController.data.forEach(todo => {
        if (!todo.state) {
          todo.state = true;
        }
      });
      this.listFillter = this.appController.loadData();
      this.appController.saveData(this.listFillter);
      this.isCheckAll = true;
    }else{
      this.appController.data.forEach(todo => {
        if (todo.state) {
          todo.state = false;
        }
      });
      this.listFillter = this.appController.loadData();
      this.appController.saveData(this.listFillter);
      this.isCheckAll = false;
    }
  }

  goToAddTodo() {
    this.appController.showModal("TodoAddPage");
  }

  goToDetail(item) {
    let modal = this.appController.showModal("TodoDetailPage", { todo: item });
    modal.onDidDismiss(data => {
      this.listFillter = this.appController.data;
    })
  }

}

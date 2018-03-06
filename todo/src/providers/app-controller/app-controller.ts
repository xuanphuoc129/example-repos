import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { Storage } from '@ionic/storage';
import { ToDo } from '../../pages/home/home';

import { ModalController, LoadingController, Loading, Toast, ToastController } from 'ionic-angular';
import { Icons, ToDos } from '../class/ToDo';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

export interface loadData {
  dataFile: boolean;
  dataStorage: boolean;
}
/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {
  listFillter: Array<ToDo> = [];
  icons: Array<Icons> = [];
  public data: Array<ToDos> = [];
  public loaddata: loadData = {
    dataFile: false,
    dataStorage: false
  }
  loadedDataChanel: Subject<string> = new Subject<string>();
  constructor(
    private http: Http,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage: Storage) {
    this.fakeData();
    this.loaddata = {
      dataFile: false,
      dataStorage: false
    }
  }

  clearData(){
    this.storage.clear();
  }

  loadDataFromJSON() {
    this.icons = [];
    this.loaddata.dataFile = false;
    this.http.get("./assets/data/data.json").map(res => res.json()).subscribe(
      data => {
        if (data.icons && data.icons.length > 0) {
          data.icons.forEach(iconData => {
            let icon: Icons = {
              id: iconData.id,
              icon: iconData.icon,
              color: iconData.color
            };
            this.icons.push(icon);
          });
        }
        this.loaddata.dataFile = true;
        this.loadedDataChanel.next("json");
        console.log("Load icons done");
      })
      this.loaddata.dataFile = true;
      this.loadedDataChanel.next("json");
  }

  getIcons() {
    if (this.icons.length > 0) return this.icons;
    else return [];
  }


  saveData(value) {
    this.storage.set("data", value).then(()=>{
      console.log("Lưu dữ liệu thành công");
    }).catch(err=>{
      console.log("Lỗi",err.code);
    });
  }

  loadData() {
    return this.data;
  }
  getData() {
    this.loaddata.dataStorage = false;
    return this.storage.get("data").then(data => {
      if (data) {
        this.data = [];
        data.forEach(todoData => {
          this.data.push(new ToDos(todoData));
        })
        this.loaddata.dataStorage = true;
        this.loadedDataChanel.next("storage");
        return this.data;
      }else{
        this.loaddata.dataStorage = true;
        this.loadedDataChanel.next("storage");
      }
    });
  }

  showModal(page: any, param?: any) {
    let modal = this.modalCtrl.create(page, param ? param : "", {
      enterAnimation: "fade-in",
      leaveAnimation: "fade-out"
    });
    modal.present();
    return modal;
  }

  loading: Loading;
  showLoading(content?: string, cssClass?: string) {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: content ? content : "Xin đợi!",
      cssClass: cssClass ? cssClass : ""
    })
    this.loading.present();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss().catch(() => {

      });
    }
  }
  toast: Toast;
  showToast(message: string, duration?: number, position?: string) {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: (duration ? duration : 3000),
      position: (position ? position : "bottom")
    })
    this.toast.present();
  }

  hideToast() {
    if (this.toast) {
      this.toast.dismiss();
      this.toast = null;
    }
  }


  getFakeData() {
    if (this.listFillter.length > 0) {
      return this.listFillter;
    } else {
      return [];
    }
  }

  convertDate(date: Date) {
    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1) + "-" + (date.getDate() > 9 ? "" : "0") + date.getDate();
  }

  convertTime(time: Date) {
    console.log(time);
    
    return (time.getHours() > 9 ? "" : "0") + time.getHours() + ":" + (time.getMinutes() > 9 ? "" : "0") + time.getMinutes();
  }

  fakeData() {
    this.listFillter = [
      {
        icon: "../assets/icon/sport.png",
        name: "Forem",
        description: "desciption skdjfalskdfjalskfjaslkddfkasjdflkasjdflkasjdflkasjdflkasjdflkasjfdlkasjdflaksdjflkasdfjlksafdjalksdfjalksfjaskldfjaslkfjaslkfjaslkfaslkdfajsffjasklfdjaskldfjaslkdfjaskldfjasklfajsfkasdfalsf",
        date: new Date(),
        time: new Date(),
        color: "#FE1E9A"
      },
      {
        icon: "../assets/icon/shopping.png",
        name: "Forem ",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#FEA64C"
      },
      {
        icon: "../assets/icon/party.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#00FFFF"
      },
      {
        icon: "../assets/icon/other.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#181743"
      },
      {
        icon: "../assets/icon/move.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#080D1C"
      },
      {
        icon: "../assets/icon/gym.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#FE1E9A"
      },
      {
        icon: "../assets/icon/sport.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#FE1E9A"
      },
      {
        icon: "../assets/icon/sport.png",
        name: "Forem",
        description: "desciption",
        date: new Date(),
        time: new Date(),
        color: "#FE1E9A"
      }
    ]
  }
}

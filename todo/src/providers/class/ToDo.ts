import { Untils } from "../untils/untils";

export interface Icons{
    id: number;
    icon : string;
    color: string;
}

export class ToDos {
    /**ID của công việc */
    id: string;
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
    /**Ngày dạng chuỗi */
    dateString: string;
    /**Giờ thực hiện */
    time: Date;
    /**Giờ dạng chuỗi */
    timeString: string;
    /**Trạng thái công việc :false Chưa hoàn thành ,true Đã hoàn thành */
    state: boolean;

    constructor(data?:any){
        this.reset();
        if(data)this.parseObject(data);
    }

    reset(){
        this.id = "";
        this.icon = "";
        this.color = "";
        this.name = "";
        this.description = "";
        this.date = new Date();
        this.dateString = Untils.getMonthString(this.date);
        this.time = new Date();
        this.timeString = this.time.toTimeString();
        this.state= false;
    }
    parseObject(todo){
        if(todo.id) this.id = todo.id;
        if(todo.icon) this.icon = todo.icon;
        if(todo.color)this.color= todo.color;
        if(todo.name)this.name = todo.name;
        if(todo.description)this.description = todo.description;
        if(todo.date)this.date = todo.date;
        if(todo.time)this.time = todo.time;
        if(todo.state)this.state = todo.state;
        if(todo.timeString)this.timeString = todo.timeString;
        if(todo.dateString)this.dateString = todo.dateString;
    }

    createID(){
        this.id = this.date.getDate() +""+ (this.date.getMonth() + 1) +""+ this.date.getFullYear() +""+ this.time.getHours() +""+ this.time.getMinutes();
    }
}
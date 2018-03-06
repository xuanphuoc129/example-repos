import { Untils } from "../untils/untils";

export class DayInMonth{
    date: number;
    month: number;
    year : number;
    dayOfWeek : string;
    constructor(){
        let today = new Date();
        this.parse(today);
    }

    parse(today:  Date){
        this.date = today.getDate();
        this.month = today.getMonth() + 1;
        this.year = today.getFullYear();
        this.dayOfWeek = Untils.getDayOfWeek(today);
    }
}
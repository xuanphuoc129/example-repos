export class Untils{
    public static MONTHSTRING = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    public static DAYINMONTHS = [31,28,31,30,31,30,31,31,30,31,30,31];
    public static DAY_OF_WEEK = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    public static getMonthString(date : Date): string{
        return this.MONTHSTRING[date.getMonth()];
    }

    public static getDayInMonth(date :  Date): number{
        let monthNumber = date.getMonth();
        let yearNumber = date.getFullYear();
        if(yearNumber % 4 == 0 && monthNumber == 1){
            return this.DAYINMONTHS[monthNumber];
        }else{
            return this.DAYINMONTHS[monthNumber];
        }
    }

    public static getDayOfWeek(date: Date) : string{
        if(date.getDay() == 0){
            return this.DAY_OF_WEEK[6];
        }else{
            return this.DAY_OF_WEEK[date.getDay()-1];
        }
    }
}
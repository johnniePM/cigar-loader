export function date_stringify(date:Date):string{
    const year:string=String(date.getFullYear());
    const day:string = date.getDate() < 10?"0"+ String(date.getDate()):String(date.getDate())
    const month:string = (date.getMonth()+1) < 10?"0"+String(date.getMonth()+1):String(date.getMonth()+1)
    return year+month+day
}

export function date_datify(the_string:string):Date{
    const year = parseInt(the_string.substring(0, 4), 10);
    const month = parseInt(the_string.substring(4, 6), 10) - 1; // Months are zero-based in JavaScript Dates
    const day = parseInt(the_string.substring(6, 8), 10);

    const date=new Date(year, month, day)
    return date

}
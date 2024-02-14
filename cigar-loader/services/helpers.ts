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

export function is_dateable(the_string:string):boolean{
    const d=new Date(parseInt(the_string.slice(0,4)),parseInt(the_string.slice(4,6))-1,parseInt(the_string.slice(6,8)))
    // console.log(the_string.slice(0,4))
    // console.log(the_string.slice(4,6))
    // console.log(the_string.slice(6,8))
    
    if (isNaN(d.getMonth())) {
        return false
     }
     else
     {
        return true
     }
}
import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary, DbUpdate } from "../constants"


export function checkIsLibrary(object: Array<any>): object is DbLibrary[] {
    var isit:boolean=true
    object.map((v)=>{
      if("cigar_id" in v ||
        "date_added" in v ||
        "humidor_id" in v ||
        "id" in v ||
        "price" in v ||
        "qrCode" in v ||
        "total_number" in v 
        ){
          
        }
      else{
        isit= false
      }
    })
    return isit
  }
  export function checkIsHumidor(object: Array<any>): object is DbHumidor[] {
    var isit:boolean=true
    object.map((v)=>{
      if("id"   in v ||
        "name"  in v ||
        "total_capacity"  in v  
        ){ 
        }
      else{
        isit= false
      }
    })
    return isit
  }
  export function checkIsCigar(object: Array<any>): object is DbCigar[] {
    var isit:boolean=true
    object.map((v)=>{
      if( "id"    in v ||
          "name"  in   v ||
          "brand"      in v || 
          "length" in   v ||
          "smoking_time" in   v ||
          "ring" in   v 
        ){ 
        }
      else{
        isit= false
      }
    })
    return isit
  }
  export function checkIsHistory(object: Array<any>): object is DbHistory[] {
    var isit:boolean=true
    object.map((v)=>{

      if(
        "id"in v ||
        "cigar"in v ||
        "date_added"in v ||
        "date_used"in v ||
        "rate"in v ||
        "comment"in v ||
        "self_used"in v
        ){ 
        }
      else{
        isit= false
      }
    })
    return isit
  }
  export function checkIsBrand(object: Array<any>): object is DbBrand[] {
    var isit:boolean=true
    object.map((v)=>{
      if( "id"    in v ||
          "name"  in   v ||
          "origin"      in v 
        ){ 
        }
      else{
        isit= false
      }
    })
    return isit
  }
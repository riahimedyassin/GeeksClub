import { recovery_question } from "./types/recovery_question.type";
import { points } from "./types/points.type";
import { address } from "./types/address.type";

export class User {
    private name! : string ; 
    private forname! : string ; 
    private age! : number ; 
    private CIN! : string ; 
    private phone! : string;
    private email! : string ; 
    private isMember? : boolean ; 
    private facebook! : string ; 
    private forums? : string[];
    private address!  : address ;
    private points? : points;
    private recovery_question! : recovery_question
}
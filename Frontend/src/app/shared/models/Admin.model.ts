import { recovery_question } from "./types/recovery_question.type";

export class Admin {
    private name! : string ; 
    private forname! : string; 
    private age! : number ; 
    private role! : 'President' | 'Vice President' | 'Other'; 
    private email! : string ; 
    private password! : string ; 
    private isSup! : boolean ; 
    private phone! : string ; 
    private facebook! : string ; 
    private recovery_question! : recovery_question 
}
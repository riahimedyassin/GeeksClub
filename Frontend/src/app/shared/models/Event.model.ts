import { date } from "./types/date.type";


type participants = {
    id : string , 
    participated : boolean ;
}

export class Event {
    private title! : string ; 
    private descreption! : string ; 
    private price! : number  ; 
    private reward_point! : number ; 
    private date! : date ; 
    private ended! : boolean ; 
    private categorie! : 'formation' | 'assignment' | 'event' | 'reunion'; 
    private participants! : participants[]; 
    private prerequis! : string[];
}
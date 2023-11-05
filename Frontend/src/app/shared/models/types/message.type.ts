export type message = {
    sent_by : {
        user_id : string , 
        name : string , 
        forname : string 
    }, 
    content : string , 
    replies : message[]
}

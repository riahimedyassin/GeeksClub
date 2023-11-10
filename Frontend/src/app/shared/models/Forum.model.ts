import { articleResponse } from './types/articleResponse.type';
import { message } from './types/message.type';

export class Forum {
  constructor(
    public _id : string , 
    public name: string,
    public descreption: string,
    public members: string[],
    public articles: articleResponse[]
  ) {}
}

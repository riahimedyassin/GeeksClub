import { Comment } from './Comment.model';
import { date } from './types/date.type';

type participants = {
  user_id: string;
  participated: boolean;
};

export class Event {
  constructor(
    public _id : string , 
    public picture : string,
    public title: string,
    public descreption: string,
    public price: number,
    public reward_point: number,
    public date: date,
    public ended: boolean,
    public categorie: 'formation' | 'assignment' | 'event' | 'reunion',
    public participants: participants[],
    public prerequis: string[], 
    public comments : Comment[]
  ) {}
}


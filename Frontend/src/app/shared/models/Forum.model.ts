import { message } from './types/message.type';

export class Forum {
  constructor(
    public name: string,
    public descreption: string,
    public members: string[],
    public articles: message[]
  ) {}
}

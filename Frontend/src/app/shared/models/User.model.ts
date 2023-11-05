import { recovery_question } from './types/recovery_question.type';
import { points } from './types/points.type';
import { address } from './types/address.type';

export class User {
  constructor(
    public picture : string, 
    public name: string,
    public forname: string,
    public age: number,
    public CIN: string,
    public phone: string,
    public email: string,
    public facebook: string,
    public address: address,
    public recovery_question: recovery_question,
    public points?: points,
    public isMember?: boolean,
    public forums?: string[]
  ) {}
}

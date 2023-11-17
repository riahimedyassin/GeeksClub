

export class Admin {
  constructor(
    public picture : string , 
    public name: string,
    public forname: string,
    public age: number,
    public role: 'President' | 'Vice President' | 'Other',
    public email: string,
    public password: string,
    public isSup: boolean,
    public phone: string,
    public facebook: string
  ) {}
}

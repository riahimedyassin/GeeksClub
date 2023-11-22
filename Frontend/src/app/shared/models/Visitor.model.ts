export class Visitor {
  constructor(
    public ip: string,
    public city: string,
    public region: string,
    public country: string, 
    public blocked : boolean,
    public loc?: string,
    public org?:string,
    public timezone?: string,
    public count? : number
  ) {}
}

export class Response<T> {
  constructor(public message: string, public status: number , public data: T , public token? : string ) {}
}

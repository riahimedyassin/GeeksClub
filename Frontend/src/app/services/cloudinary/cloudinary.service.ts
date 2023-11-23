import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/env';


const URL = `${environment.host}/signature`

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}
  uploadToCloud(formData: FormData, folder: string, signData: any) {
    const url =
      'https://api.cloudinary.com/v1_1/' +
      signData['cloudname'] +
      '/auto/upload?' +
      'api_key=' +
      signData['apikey'] +
      '&timestamp=' +
      signData['timestamp'] +
      '&signature=' +
      signData['signature'] +
      '&eager=c_pad,h_300,w_400|c_crop,h_200,w_260' +
      '&folder='+folder;

    return this.http.post(url, formData);
  }
  getSignature(foldername : string) {
    return this.http.get(`${URL}/${foldername}`)
  }
}

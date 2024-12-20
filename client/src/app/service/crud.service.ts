import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { Client } from '../model/Client.model';
import { Contact } from '../model/Contact.model';
import { Offre } from '../model/Offre.model';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
const httpOptions={
  headers:new HttpHeaders({'Content-Type' :'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {



  helper=new JwtHelperService();
  apiUrl="http://localhost:8081/api"
  loginUserUrl="http://localhost:8081/api/client/login"
  private _clientConnect= new Subject<void>();
  isConnected=false;

  constructor(private http:HttpClient,private router:Router) { }
  addcontact(contact:Contact){ // envoie une requête HTTP POST vers une URL qui se trouve à l'adresse this.apiUrl+"/contact"
    return this.http.post<any>(this.apiUrl+"/contact", contact,httpOptions);
  }
  onDeletecontact(id : number){
    const url =`${this.apiUrl+"/contact"}/${id}` 
    return this.http.delete(url , httpOptions)
  }
  getcontact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl + "/contact");
  }
  getOffre(): Observable<Offre[]>{
    return this.http.get<Offre[]>(this.apiUrl + "/offre");
  }
  onDeleteclient(id : number){
    const url =`${this.apiUrl+"/client"}/${id}` 
    return this.http.delete(url , httpOptions)
  }
  loginClientFromApi(client:Client){
    return this.http.post<any>(this.loginUserUrl, client);
  }


  loginclient(client: Client) {
    this.loginClientFromApi(client).subscribe(
      (data) => {
        console.log('API Response:', data);
  
        // Decode the token
        let decoded: any;
        try {
          decoded = jwt_decode(data.token);
          console.log('Decoded Token:', decoded);
  
          // Validate the token structure
          if (decoded?.data) {
            this.loginInClient(decoded.data);
            this._clientConnect.next(); // Emit event if needed
          } else {
            console.error('Decoded token does not contain "data" field.');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      },
      (error) => {
        console.error('Login API Error:', error);
      }
    );
  }
  
  loginInClient(data: any) {
    if (!data || !data.id) {
      console.error('Invalid data received:', data);
      return;
    }
  
    // Save client ID to localStorage
    localStorage.setItem("idC", data.id);
  
    // Set connection status and navigate
    this.isConnected = true;
    this.router.navigate(['/offre']).then(() => {
      window.location.reload();
    });
  }
  
  addclient(client:Client){ // envoie une requête HTTP POST vers une URL qui se trouve à l'adresse this.apiUrl+"/contact"
    return this.http.post<any>(this.apiUrl+"/client", client,httpOptions);
  }
  isLoggedIn(){
    

    let token = localStorage.getItem("idC");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  userDetails(){
    let token:any=localStorage.getItem('idC');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }
   reserverFromApi(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/reservation" ,rq ,httpOptions);
 }

}

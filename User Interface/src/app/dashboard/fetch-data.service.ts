import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { savedStock } from '../savedStock';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root'
})

export class FetchDataService {
  

  constructor(private http: HttpClient) { }
  
  getQuoteByMarketCap(marketCap:any)
  {
    
    return this.http.get( "http://localhost:8085/getQuoteByMarketCap/"+marketCap);
  }

  getRecommendations(marketCap:any)
  {
    return this.http.get( "http://localhost:8085/getRecommendations/"+marketCap);
  }

  saveStock(ss:savedStock): Observable<any> {
    
    return this.http.post(AUTH_API + 'saveStock', 
    JSON.stringify(ss)
    , httpOptions);
  }

  getSavedStocks(username:string)
  {
    return this.http.get(AUTH_API+'getsavedStock/'+username);

  }

  getQuotes(symbol :string)
  {
    return this.http.get( "http://localhost:8085/getQuote/"+symbol);

  }
  deleteStock(username:string,sym:any)
  {
    return this.http.get(AUTH_API+'deletesavedStock/'+username+'/'+sym);

  }
}

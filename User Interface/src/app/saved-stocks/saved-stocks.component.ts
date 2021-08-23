import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../dashboard/fetch-data.service';
import { savedStock } from '../savedStock';
import { stock } from '../stock';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-saved-stocks',
  templateUrl: './saved-stocks.component.html',
  styleUrls: ['./saved-stocks.component.css']
})
export class SavedStocksComponent implements OnInit {

  constructor(private fetchService: FetchDataService,private token:TokenStorageService) { }
  currentUser:any;
  stocks: any;
  temp:any;
  prices: any;
  len:number = 0;
  deleted :boolean= false;
  loading:boolean = false;
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.prices = new Map<String,string>();
    this.loading = true;
    this.fetchService.getSavedStocks(this.currentUser.username).subscribe(
      (response) =>
      {
        this.stocks = response
        for(var s in this.stocks)
        {
          this.len++;
        }
        for (var i = 0; i < this.len; i++) {
          this.getPrice(this.stocks[i].stock_symbol)
        }
        this.loading=false;
        
    }
      
    )
    
    
  }
  getPrice(sym:string) 
  {
    var temp:any;
    this.fetchService.getQuotes(sym).subscribe(
      (response) =>
      {
        temp=response
          this.prices.set(sym ,temp[0].currentPrice)
         
      }
      
    )
  }
  
  deleteStock(s:savedStock)
  {
    this.fetchService.deleteStock(this.currentUser.username,s.stock_symbol).subscribe(
      (response) =>
      {
        if(response)    
        this.deleted = true;
      }
    )
    window.location.reload()
    
  }
}

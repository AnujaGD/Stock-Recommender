import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-side-top-nav',
  templateUrl: './side-top-nav.component.html',
  styleUrls: ['./side-top-nav.component.css']
})
export class SideTopNavComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService , private router:Router) { }
  isLoggedIn = false;
  viewSavedStocks = false;
  user? :any
  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(!this.isLoggedIn)
    {
      this.router.navigate(['login']);
    }
    else{
      this.user = this.tokenStorageService.getUser();
    }
  }

  seeDashboard()
  {
    this.viewSavedStocks = false;

  }

  getSaved()
  {
    this.viewSavedStocks = true;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

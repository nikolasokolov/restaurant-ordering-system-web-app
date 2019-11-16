import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  test() {
    this.httpClient.get('https://localhost:8080/api/test').subscribe(response => {
      console.log('success');
    }, error => {
      console.log('error');
    });
  }

}

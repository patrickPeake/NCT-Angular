import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  title = 'httpMod';
  i = new Date().getTime()

  data: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/')
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data = dataArray;
        console.log(this.data);

      });
  }

    

  


  headers = ['Location', 'Name', 'Time', 'Status', 'more info', 'delete']; // Add or remove headers as needed
}
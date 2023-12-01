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
  firstValues: any[] = [];
  resultArray: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/')
      .pipe(
        map((jsonData: any[]) => {
          return jsonData.map(item => {
            const firstKey = Object.keys(item)[0]; // Extract the first key
            const firstValue = item[firstKey]; // Extract the value corresponding to the first key
            return firstValue;
          });
        })
      )
      .subscribe((valuesArray: any[]) => {
        this.firstValues = valuesArray;
        //console.log(this.firstValues);
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/')
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data = dataArray;
        //console.log(this.data);
        for (let j = 0; j < this.data.length; j++) {
          let newArray = [ this.firstValues[j]];
          for(let k=0; k<this.data[j].length; k++){
            newArray.push(this.data[j][k]);
            //console.log("this.data[j][k]");
          }
          this.resultArray.push(newArray);
          //console.log(this.resultArray);
        }
        this.data = this.resultArray;
        console.log(this.resultArray);
        console.log("end");
      });

      
  }

    

  


  headers = ['Location', 'Name', 'Time', 'Status', 'more info', 'delete']; // Add or remove headers as needed


  deleteRow(rowId: any): void {
    // Implement the logic to delete the row with the given ID
    console.log('Deleting row with ID:', rowId);
    // Add your deletion logic here
    const toDel = 'https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/' + rowId + '/';
    //console.log(toDel);
    this.http.delete(toDel,{}).subscribe()
    window.location.reload();
  }

}
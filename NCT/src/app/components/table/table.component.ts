import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  title = 'httpMod';
  correctPlace!: string;
  headers = ['Location', 'Name', 'Time', 'Status', 'more info', 'delete']; // Add or remove headers as needed

  i = new Date().getTime();
  @Output() infoRow = new EventEmitter();

  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];

  data2: any[] = [];
  firstValues2: any[] = [];
  resultArray2: any[] = [];

  constructor(private http: HttpClient){}
  private readonly expectedHash = "fcab0453879a2b2281bc5073e3f5fe54";

  ngOnInit(): void {
    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/') //extract the keys from each entry
      .pipe(
        map((jsonData: any[]) => {
          return jsonData.map(item => {
            const firstKey = Object.keys(item)[0]; 
            const firstValue = item[firstKey]; 
            return firstValue;
          });
        })
      )
      .subscribe((valuesArray: any[]) => {
        this.firstValues = valuesArray;
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/') //extract all the data from each entry
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data = dataArray;
        for (let j = 0; j < this.data.length; j++) { //combine into one array with the key as the first value and the data as the 1..n values
          let newArray = [ this.firstValues[j]];
          for(let k=0; k<this.data[j].length; k++){
            newArray.push(this.data[j][k]);
          }
          this.resultArray.push(newArray);
        }
        this.data = this.resultArray;
      });
  }

  deleteRow(rowId: any): void {
    const password = prompt('Please enter your password:');
    let enteredHash;

    if(password != null){
      enteredHash = CryptoJS.MD5(password).toString();
    } else {
      alert("password is null");
      return;
    }
    
    // Check if the password is correct
    if (password !== null && enteredHash === this.expectedHash) {
      const toDel = 'https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/' + rowId + '/'; //construct full url
      this.http.delete(toDel,{}).subscribe(() => {}) //delete the row from the db
      
      this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/') //extract the keys from each entry
      .pipe(
        map((jsonData: any[]) => {
          return jsonData.map(item => {
            const firstKey = Object.keys(item)[0]; 
            const firstValue = item[firstKey]; 
            return firstValue;
          });
        })
      )
      .subscribe((valuesArray: any[]) => {
        this.firstValues2 = valuesArray;
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/') //extract all the data from each entry
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data2 = dataArray;
        for (let j = 0; j < this.data2.length; j++) { //combine into one array with the key as the first value and the data as the 1..n values
          let newArray = [ this.firstValues2[j]];
          for(let k=0; k<this.data2[j].length; k++){
            newArray.push(this.data2[j][k]);
          }
          this.resultArray2.push(newArray);
        }
        this.data2 = this.resultArray2;
        console.log(this.resultArray2);
        for (let j = 0; j < this.data.length; j++) {
          if(this.data[j][0] == rowId){
            this.correctPlace = this.data[j][1];
          }
        }

        for (let j = 0; j < this.data2.length; j++) {
          if(this.data2[j][1] == this.correctPlace){ //chech if if the selected location entry is the correct one
            const path = 'https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/' + this.data2[j][0] + '/'; //construct the path
            const temp = parseInt(this.data2[j][4]) - 1; //decrements the numbero f incidents
            this.http.put(path,{ //put the updated location
              "key": this.data2[j][0],
              "data": [this.data2[j][1], this.data2[j][2], this.data2[j][3], temp.toString()]
            }).subscribe(
              () => {
                window.location.reload(); //reload the window
            })
          }
        }
      });
    } else {
      alert('Incorrect password or canceled');
    }
  }

  infoRowF(rowId: any): void { //throw the rowID of the selected row to get info of up to parent
    this.infoRow.emit(rowId);
  }


}
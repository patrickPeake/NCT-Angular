import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  
  isValidUrl(url: string): boolean {
    // You can implement a more sophisticated URL validation logic if needed
    return url !== undefined && url !== null && url.trim() !== '';
  }
  
  constructor(private http: HttpClient){}
  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];

  name = "";
  place = "";
  time = "";
  status = "";
  repName = "";
  repNum = "";
  imageUrl = '';
  info = "";

  updateInfo(value: string){
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
        for (let j = 0; j < this.data.length; j++) {
          if(this.data[j][0] === value){
            this.place = this.data[j][1];
            this.name = this.data[j][2];
            this.time = this.data[j][3];
            this.status = this.data[j][4];
            this.repNum = this.data[j][5];
            this.repName = this.data[j][6];
            this.imageUrl = this.data[j][7];
            this.info = this.data[j][8];
          }
        }
      });
      
  }


}

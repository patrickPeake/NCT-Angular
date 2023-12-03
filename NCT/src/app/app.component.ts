import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitComponent } from './components/split/split.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'NCT';
  name!: string;
  place!: string;
  reporter!: string;
  repNum!: string;
  link!: string;
  info!: string;
  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];

  i = new Date().getTime();
  utcDate: any;
  utcDateString!: string;
  constructor(private http: HttpClient){}
  @ViewChild(SplitComponent) SplitComponent: SplitComponent | undefined;

  addInc(){
    this.i = new Date().getTime();
    this.utcDate = new Date(this.i);
    this.utcDateString = this.utcDate.toUTCString();
    
    console.log(this.utcDateString);
    console.log(this.name + this.place);
    this.http.post('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/',{
      "key": this.i.toString(),
      "data": [this.place, this.name, this.utcDateString, "OPEN", this.repNum, this.reporter, this.link, this.info]
    }).subscribe(
      (data:any)=>{
        console.log(data);
        //window.location.reload();
    })

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/')
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

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/')
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
        for (let j = 0; j < this.data.length; j++) {
          if(this.data[j][1] == this.place){
            const path = 'https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/' + this.data[j][0] + '/';
            const temp = parseInt(this.data[j][4]) + 1;
            alert(temp);
            this.http.put(path,{
              "key": this.data[j][0],
              "data": [this.place, this.data[j][2], this.data[j][3], temp.toString()]
            }).subscribe(
              () => {
                window.location.reload();
            })
          }
        }
        console.log("end");
      });
  }
  updateN(value: string){
    console.log(value);
    this.name = value;
  }
  updateP(value: string){
    console.log(value);
    this.place = value;
  }
  updateNu(value: string){
    console.log(value);
    this.repNum = value;
  }
  updateR(value: string){
    console.log(value);
    this.reporter = value;
  }
  updateL(value: string){
    console.log(value);
    this.link = value;
  }
  updateI(value: string){
    console.log(value);
    this.info = value;
  }
  infoF(value: string) {
    //console.log('info on row ' + value);

    // Call the function in InfoComponent if the reference is available
    if (this.SplitComponent) {
      this.SplitComponent.updateInfo(value);
    }
  }

  

}

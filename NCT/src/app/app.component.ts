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
    this.utcDateString = this.utcDate.toUTCString(); //create human readable date
// I forgot to make a new collection called incidents or something when I started messing around with the API so the...
// collection that populates the table is called "people" even though it doesnt really have anything to do with people
    this.http.post('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/',{ //create a new entry with the data passed up the heirarchy
      "key": this.i.toString(),
      "data": [this.place, this.name, this.utcDateString, "OPEN", this.repNum, this.reporter, this.link, this.info]
    }).subscribe(()=>{})
// I also should have somehow encapsulated this functionality as a globally accessable function (service?) as this code (the http get request) is duplicated all over and very seldom changed significantly
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
        this.firstValues = valuesArray;
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/') //extract all the data from each entry
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
        for (let j = 0; j < this.data.length; j++) {
          if(this.data[j][1] == this.place){ //checks if this is the right place entry 
            const path = 'https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/' + this.data[j][0] + '/';
            const temp = parseInt(this.data[j][4]) + 1; //increments the number of incidents
            this.http.put(path,{ //puts the updated info
              "key": this.data[j][0],
              "data": [this.place, this.data[j][2], this.data[j][3], temp.toString()]
            }).subscribe(
              () => {
                window.location.reload(); //reloads the window
            })
          }
        }
      });
  }
  updateN(value: string){ //see "create.component.ts line 12"
    this.name = value;
  }
  updateP(value: string){
    this.place = value;
  }
  updateNu(value: string){
    this.repNum = value;
  }
  updateR(value: string){
    this.reporter = value;
  }
  updateL(value: string){
    this.link = value;
  }
  updateI(value: string){
    this.info = value;
  }
  infoF(value: string) { //calls the child function to update the info
    if (this.SplitComponent) {
      this.SplitComponent.updateInfo(value);
    }
  }

  

}

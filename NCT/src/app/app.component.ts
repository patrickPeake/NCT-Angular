import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  i = new Date().getTime();
  utcDate: any;
  utcDateString!: string;
  constructor(private http: HttpClient){}

  addInc(){
    this.i = new Date().getTime();
    this.utcDate = new Date(this.i);
    this.utcDateString = this.utcDate.toUTCString();
    console.log(this.utcDateString);
    console.log(this.name + this.place);
    this.http.post('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/',{
      "key": this.i.toString(),
      "data": [this.place, this.name, this.utcDateString, "in progress", this.repNum, this.reporter]
    }).subscribe(
      (data:any)=>{
        console.log(data);
        window.location.reload();
    })
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
    this.reporter = value;
  }
  updateI(value: string){
    console.log(value);
    this.info = value;
  }


}

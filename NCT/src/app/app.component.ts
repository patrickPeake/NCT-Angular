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
      "data": [this.place, this.name, this.utcDateString, "in progress"]
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

}

import { Component, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitComponent } from './components/split/split.component';

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

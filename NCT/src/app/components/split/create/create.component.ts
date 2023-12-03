import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() updateN = new EventEmitter();
  @Output() updateP = new EventEmitter();
  @Output() updateNu = new EventEmitter();
  @Output() updateR = new EventEmitter();
  @Output() updateLi = new EventEmitter();
  @Output() updateIn = new EventEmitter();

  constructor(private http: HttpClient){}

  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];



  locationsArray: string[] = []; // Add your actual locations


  ngOnInit(): void {
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
        for (let j = 0; j < this.data.length; j++) {
          this.locationsArray[j] = this.data[j][1];
        }
      });

      
  }





  onInputChangeN(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateN.emit(inputValue)
  }

  

  onInputChangeL(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateP.emit(inputValue);
  }

  onInputChangeR(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateR.emit(inputValue)
  }

  onInputChangeNu(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateNu.emit(inputValue);
  }
  onInputChangeI(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateIn.emit(inputValue)
  }

  onInputChangeLi(event :any){
    const inputValue = event.target.value;
    //console.log(inputValue)
    this.updateLi.emit(inputValue);
  }



  
}

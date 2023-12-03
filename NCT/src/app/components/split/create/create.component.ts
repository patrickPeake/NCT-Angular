import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() updateN = new EventEmitter(); //Event Emitters
  @Output() updateP = new EventEmitter(); //in hind sight I should have created one object or array to store all the values and throw it up and down through the components... 
  @Output() updateNu = new EventEmitter(); // each time any was changed but I dont want to refactor this so it will remain like this mess for all eternity
  @Output() updateR = new EventEmitter();
  @Output() updateLi = new EventEmitter();
  @Output() updateIn = new EventEmitter();

  constructor(private http: HttpClient){}

  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];

  locationsArray: string[] = []; 


  ngOnInit(): void {
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
          this.locationsArray[j] = this.data[j][1];
        }
      });

      
  }

  onInputChangeN(event :any){ //These are all basically identical
    const inputValue = event.target.value;
    this.updateN.emit(inputValue);
  }
  onInputChangeL(event :any){ //I dont remember why I make a const then throw it instead of throwing event.target.value like in split.component.ts but it works and I dont want to refactor this either
    const inputValue = event.target.value;
    this.updateP.emit(inputValue);
  }
  onInputChangeR(event :any){
    const inputValue = event.target.value;
    this.updateR.emit(inputValue);
  }
  onInputChangeNu(event :any){
    const inputValue = event.target.value;
    this.updateNu.emit(inputValue);
  }
  onInputChangeI(event :any){
    const inputValue = event.target.value;
    this.updateIn.emit(inputValue);
  }
  onInputChangeLi(event :any){
    const inputValue = event.target.value;
    this.updateLi.emit(inputValue);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  
  isValidUrl(url: string): boolean { //checks if the url is valid
    try {
      new URL(url);
      return true; // The URL is valid
    } catch (error) {
      return false; // The URL is not valid
    }
  }
  
  constructor(private http: HttpClient){}
  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];

  id = "";
  name = "";
  place = "";
  time = "";
  status = "";
  repName = "";
  repNum = "";
  imageUrl = '';
  info = "";
  private readonly expectedHash = "fcab0453879a2b2281bc5073e3f5fe54";

  updateInfo(value: string){ //updates the info when called from the parent
    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/') //extract the keys from each entry
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
        for (let j = 0; j < this.data.length; j++) { 
          if(this.data[j][0] === value){  //if this is the right row
            this.id = this.data[j][0];  //populate the variables with the correct values 
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

  updateStatus(){
    const password = prompt('Please enter your password:'); 
    let enteredHash;

    if(password != null){
      enteredHash = CryptoJS.MD5(password).toString();
    } else {
      alert("password is null");
      return;
    }
    
    // Check if the password is correct
    if (password !== null && enteredHash === this.expectedHash) { //if the password is correct get the new status
      const stat = prompt('Please enter the new status:'); //stat could have been set to "RESOLVED" but having multiple statuses (OPEN, ASSIGNED, RESOLVED) seems like better functionality
      const path = 'https://272.selfip.net/apps/t4foZFvfjT/collections/people/documents/' + this.id + '/'; //construct the correct api call path
      console.log(path);
      this.http.put(path,{ //put the updated status
        "key": this.id,
        "data": [this.place, this.name, this.time, stat, this.repNum, this.repName, this.imageUrl, this.info]
      }).subscribe(
        () => {
          window.location.reload(); //reload the window
      })
    } else { //alert the password is wrong
      alert('Incorrect password or canceled');
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.css'
})
export class CreateLocationComponent {

  name!: string;
  lo!: string;
  la!: string;

  constructor(private http: HttpClient){}

  onInputChangeN(event: any) { //updates the name var every time the input box is changed
    this.name = event.target.value;
  }

  onInputChangeLo(event: any) { //updates the lo var every time the input box is changed
    const inputValue = event.target.value;
    if (this.isValidLongitude(inputValue)) {
      this.lo = inputValue;
    } else { //if the value is invalid log to console, user is only alerted if they try to submit an invalid value not if they only enter it
      console.log('Invalid longitude value');
    }
  }

  onInputChangeLa(event: any) { //updates the la var every time the input box is changed
    const inputValue = event.target.value;
    if (this.isValidLatitude(inputValue)) {
      this.la = inputValue;
    } else { //if the value is invalid log to console, user is only alerted if they try to submit an invalid value not if they only enter it
      console.log('Invalid latitude value');
    }
  }

  create() {
    const i = new Date().getTime();

    if (this.isValidLongitude(this.lo)) {
      if (this.isValidLatitude(this.la)) {
        this.http.post('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/',{ //if the stored lat and long values are valid post a new location to the storage
          "key": i.toString(),
          "data": [this.name, this.lo, this.la, "0"]
        }).subscribe(
          ()=>{
            window.location.reload(); //then reload the page
        })
      } else {
        alert("invalid lat"); //alert if the values are invalid
      }
    } else {
      alert("invalid long");
    }
  }

  private isValidLongitude(value: string): boolean { //checks if the input value is valid
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= -180 && numericValue <= 180;
  }

  private isValidLatitude(value: string): boolean { //checks if the input value is valid
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= -90 && numericValue <= 90;
  }
}
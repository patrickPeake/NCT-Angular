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

  onInputChangeN(event: any) {
    this.name = event.target.value;
  }

  onInputChangeLo(event: any) {
    const inputValue = event.target.value;
    if (this.isValidLongitude(inputValue)) {
      this.lo = inputValue;
    } else {
      console.log('Invalid longitude value');
    }
  }

  onInputChangeLa(event: any) {
    const inputValue = event.target.value;
    if (this.isValidLatitude(inputValue)) {
      this.la = inputValue;
    } else {
      console.log('Invalid latitude value');
    }
  }

  create() {
    if (this.isValidLongitude(this.lo)) {
      if (this.isValidLatitude(this.la)) {


        


        console.log(this.name, this.lo, this.la);
        this.la = "1000";
        this.lo = "1000";

      } else {
        alert("invalid lat");
      }
    } else {
      alert("invalid long");
    }
  }

  private isValidLongitude(value: string): boolean {
    // Add your validation logic for longitude
    // Example: Check if the value is a valid number within the longitude range
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= -180 && numericValue <= 180;
  }

  private isValidLatitude(value: string): boolean {
    // Add your validation logic for latitude
    // Example: Check if the value is a valid number within the latitude range
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= -90 && numericValue <= 90;
  }
}
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() updateN = new EventEmitter();
  @Output() updateP = new EventEmitter();


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
}

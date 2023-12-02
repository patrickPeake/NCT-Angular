import { Component, EventEmitter, Output } from '@angular/core';

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

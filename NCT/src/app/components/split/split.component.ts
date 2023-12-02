import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrl: './split.component.css'
})
export class SplitComponent {
  @Output() updateNa = new EventEmitter();
  @Output() updatePl = new EventEmitter();
  @Output() updateNu = new EventEmitter();
  @Output() updateRep = new EventEmitter();
  @Output() updateIn = new EventEmitter();
  @Output() updateLi = new EventEmitter();

  updateN(value: string){
    this.updateNa.emit(value)
  }
  updateP(value: string){
    this.updatePl.emit(value)
  } 
  updateNum(value: string){
    this.updateNu.emit(value)
  }
  updateRe(value: string){
    this.updateRep.emit(value)
  } 
  updateL(value: string){
    this.updateLi.emit(value)
  }
  updateI(value: string){
    this.updateIn.emit(value)
  } 

}

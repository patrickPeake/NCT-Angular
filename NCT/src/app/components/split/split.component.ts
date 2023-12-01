import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrl: './split.component.css'
})
export class SplitComponent {
  @Output() updateNa = new EventEmitter();
  @Output() updatePl = new EventEmitter();

  updateN(value: string){
    this.updateNa.emit(value)
  }
  updateP(value: string){
    this.updatePl.emit(value)
  } 
}

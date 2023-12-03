import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrl: './split.component.css'
})
export class SplitComponent {
  @Output() updateNa = new EventEmitter(); //Event Emitters
  @Output() updatePl = new EventEmitter(); //see "create.component.ts line 12"
  @Output() updateNu = new EventEmitter();
  @Output() updateRep = new EventEmitter();
  @Output() updateIn = new EventEmitter();
  @Output() updateLi = new EventEmitter();

  @ViewChild(InfoComponent) infoComponent: InfoComponent | undefined;

  updateN(value: string){ //These are all basically identical
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
  updateInfo(value: string){ //calls the child function to update the info
    if (this.infoComponent) {
      this.infoComponent.updateInfo(value);
    }
    
  }

}

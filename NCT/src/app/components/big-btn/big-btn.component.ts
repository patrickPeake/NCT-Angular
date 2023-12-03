import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-big-btn',
  templateUrl: './big-btn.component.html',
  styleUrl: './big-btn.component.css'
})
export class BigBtnComponent { //when the button is clicked emit to the parent component
  @Output() btnClick = new EventEmitter()
  onClick(){
    this.btnClick.emit()
  }
}

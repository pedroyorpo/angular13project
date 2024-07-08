import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-all-buttons',
  templateUrl: './all-buttons.component.html',
  styleUrls: ['./all-buttons.component.css']
})
export class AllButtonsComponent implements OnInit {
  @Output() printClicked = new EventEmitter<void>();
  @Output() excelClicked = new EventEmitter<void>();
  Action: string;
  constructor() { }

  ngOnInit(): void {
  }

  DisplayTab(Action:string){
    this.Action = Action.toLocaleLowerCase();
    if(this.Action == 'print'){
      this.printClicked.emit();
    }
    if(this.Action == 'excel'){
      this.excelClicked.emit();
    }
  }


  onClickPrint() {
    this.printClicked.emit();
  }

  onClickExcel() {
    this.excelClicked.emit();
  }

}

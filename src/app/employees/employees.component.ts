import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
num: any;
placeHolder: string;
searchKey: any;
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
dataSource = ELEMENT_DATA;

applyFilter() {
throw new Error('Method not implemented.');
}
clearSearch() {
throw new Error('Method not implemented.');
}
onClickNew() {
throw new Error('Method not implemented.');
}
onClickPrintReceipts() {
throw new Error('Method not implemented.');
}
// listData: CdkTableDataSourceInput<any>;
defaultColumns: any;
numberColumns: any;
dateColumns: any;
onUpdate(_t81: any) {
throw new Error('Method not implemented.');
}
onDelete(_t81: any) {
throw new Error('Method not implemented.');
}
mergeColumns: any;
isTrue: any;
items: any;
pageSizeOptions: number[]|readonly number[];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  printResult: string | null = null;
  header:any;
  details:any;
  config:any;
  Transaction:any;
  Title:any;
  line : string = "______________________";
  @ViewChild('tableToExport') table: any;
  constructor(
  ) { }
  ngOnInit(): void {
    this.header = JSON.parse(localStorage.getItem('Header'));
    this.details = JSON.parse(localStorage.getItem('Details'));
    this.Transaction = localStorage.getItem('Transaction');
    this.Title = localStorage.getItem('Title');
  }

  getTotalAmount(){
    let sum: number = 0;
    this.header.forEach(a => sum += +a.TotalAmount);
    return sum;
  }

  getTotalDiscount(){
    let sum: number = 0;
    this.header.forEach(a => sum += +a.Discount);
    return sum;
  }

  getTotalDue(){
    let sum: number = 0;
    this.header.forEach(a => sum += +a.TotalDue);
    return sum;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.clear();
  }
  onClickPrint() {
    window.print();
  }

  onClickExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.Title+'.xlsx');
  }


}

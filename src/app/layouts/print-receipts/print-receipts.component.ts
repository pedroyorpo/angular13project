import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-print-receipts',
  templateUrl: './print-receipts.component.html',
  styleUrls: ['./print-receipts.component.css']
})
export class PrintReceiptsComponent implements OnInit {

  printResult: string | null = null;
  headers:any[];
  Title:any;
  Transaction:any;
  @ViewChild('tableToExport') table: any;
  constructor(
  ) { }

  ngOnInit(): void {
    this.headers = JSON.parse(localStorage.getItem('Headers'));
    this.Title = localStorage.getItem('Title');
    this.Transaction = localStorage.getItem('Transaction');
  }

 
  getTotalTotalAmount(){
    let sum: number = 0;
    this.headers.forEach(a => sum += +a.TotalAmount);
    return sum;
  }


  getTotalDiscount(){
    let sum: number = 0;
    this.headers.forEach(a => sum += +a.Discount);
    return sum;
  }

  getTotalTotalDue(){
    let sum: number = 0;
    this.headers.forEach(a => sum += +a.TotalDue);
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

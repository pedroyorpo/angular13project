import { DatePipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolBoxService {

  constructor(
    private datePipe        : DatePipe,
    private router          : Router,

  ) { }
  CurrentDateTime()
  {
    return formatDate(new Date(),"YYYY-MM-dd HH:mm","en-US");
  }
  ConvertToDateFormat(date:Date)
  {
    const parsedDateFrom = new Date(date);
    var dateFrom =  this.datePipe.transform(parsedDateFrom, 'yyyy-MM-dd') || '';
    return dateFrom;
  }
  ConvertToDateTimeFormat(date:Date)
  {
    return formatDate(date,"YYYY-MM-dd HH:mm:ss","en-US");
  }

  ConvertToNumberFormatWithComma(x:any){
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  ConvertToNumberFormatNoComma(x:any){
    var z = (Number(x.replaceAll(",","")));
    return z;
  }

  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  
  pageSize(){
    return [5,10,25,50,100];
  }
  onHome(){
    this.router.navigate(['/home']);
  }

  getMonthName(monthNumber: any): string {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1]; 
  }

  getYears(){
    return ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  }

  getMonths(){
    var months:any = [
      {
        'Label' : 'January',
        'Value' : '1',
      },
      {
        'Label' : 'February',
        'Value' : '2',
      },
      {
        'Label' : 'March',
        'Value' : '3',
      },
      {
        'Label' : 'April',
        'Value' : '4',
      },
      {
        'Label' : 'May',
        'Value' : '5',
      },
      {
        'Label' : 'June',
        'Value' : '6',
      },
      {
        'Label' : 'July',
        'Value' : '7',
      },
      {
        'Label' : 'August',
        'Value' : '8',
      },
      {
        'Label' : 'September',
        'Value' : '9',
      },
      {
        'Label' : 'October',
        'Value' : '10',
      },
      {
        'Label' : 'November',
        'Value' : '11',
      },
      {
        'Label' : 'Decemeber',
        'Value' : '12',
      },
    ];

    return months;
 
  }


}

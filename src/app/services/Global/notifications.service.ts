import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  TO(message: any) {
    throw new Error('Method not implemented.');
  }
  toastMessage() {
    throw new Error('Method not implemented.');
  }

 
  constructor(
    private toastr : ToastrService,
  ) { }


  toastrSuccess(msg:any){
    this.toastr.success(msg);
    
  }
  toastrError(msg:any){
    this.toastr.error(msg);
  }

  toastrWarning(msg:any){
    this.toastr.warning(msg);
  }

  toastrInfo(msg:any){
    this.toastr.info(msg);
  }
  
  popupSwalMixin(title:string){
  const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: title
        });

  }

  popupWarning(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            cancelButtonText: 'No'
          });
  }
  popup(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: 'OK',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            cancelButtonText: 'No'
          });
  }

  popupWarning3Buttons(title:string, text:string){
    return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor :'#3f51b5',
            cancelButtonColor :'#f44336',
            denyButtonText: 'Yes, Remove All'
          });

         
  }


}

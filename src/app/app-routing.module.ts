import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './home/Files/components/items/items.component';
import { LandingComponent } from './layouts/landing/landing.component';
import { CustomersComponent } from './home/Files/components/customers/customers.component';
import { SuppliersComponent } from './home/Files/components/suppliers/suppliers.component';
import { SalesTransactionComponent } from './home/Sales/components/sales-transaction/sales-transaction.component';
import { SalesReceiptUIComponent } from './home/Sales/components/sales-receipt-ui/sales-receipt-ui.component';
import { EditSalesRecordsComponent } from './home/Sales/components/edit-sales-records/edit-sales-records.component';
import { PrintReceiptComponent } from './layouts/print-receipt/print-receipt.component';
import { PrintReceiptsComponent } from './layouts/print-receipts/print-receipts.component';
import { PrintComponent } from './layouts/print/print.component';
import { ReceivingReceiptsComponent } from './home/receiving/components/receiving-receipts/receiving-receipts.component';
import { EditReceivingRecordsComponent } from './home/receiving/components/edit-receiving-records/edit-receiving-records.component';
import { ReceivingTransactionsComponent } from './home/receiving/components/receiving-transactions/receiving-transactions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardUIComponent } from './dashboard-ui/dashboard-ui.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProtectedComponent } from './protected/protected.component';
import { EmployeesComponent } from './employees/employees.component';
import { ItemUIComponent } from './home/Files/componentsShared/item-ui/item-ui.component';
import { CutofftimecardsComponent } from './attendance/cutofftimecards/cutofftimecards.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileUIComponent } from './user-profile-ui/user-profile-ui.component';

const routes: Routes = [
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}, // Accessible to everyone
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 



  { path: 'navbar',component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',component: DashboardUIComponent,
        //  path: 'files/items',component: ItemsComponent,
      
      },
      {
        path: 'employees',component: EmployeesComponent,
      },
      {
        path:'attendance/cutofftimecards',component: CutofftimecardsComponent,
       // path: 'files/customers',component: CustomersComponent,
      },
      {
        path: 'userprofileui',component: UserProfileUIComponent,
      //  path: '/suppliers',component: SuppliersComponent,
      },
      {
        path: 'sales/sales_transaction',component: SalesTransactionComponent,
      },
      {
        path: 'sales/sales_receipt',component: SalesReceiptUIComponent,
      },
      {
        path: 'sales/edit_sales_records',component: EditSalesRecordsComponent,
      },
      {
      path: 'receiving/receiving_transaction',component: ReceivingTransactionsComponent,
      },
      {
        path: 'receiving/receiving_receipts',component: ReceivingReceiptsComponent,
      },
      {
        path: 'receiving/edit_receiving_records',component: EditReceivingRecordsComponent
      },
     
      

    ]
  },
  {
    path: 'print',component: PrintComponent,
    children: [
      {
        path: 'printreceipts',component: PrintReceiptsComponent
      },
      {
        path: 'printreceipt',component: PrintReceiptComponent
      },
    ]
  },

];


@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
})


export class AppRoutingModule { }

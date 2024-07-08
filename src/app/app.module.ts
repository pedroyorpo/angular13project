import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './layouts/landing/landing.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ItemsComponent } from './home/Files/components/items/items.component';
import { ItemUIComponent } from './home/Files/componentsShared/item-ui/item-ui.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from 'src/Material/Material.module';
import{ToastrModule} from 'ngx-toastr';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './home/Files/components/customers/customers.component';
import { CustomerUIComponent } from './home/Files/componentsShared/customers-ui/customers-ui.component';
import { SuppliersUiComponent } from './home/Files/componentsShared/suppliers-ui/suppliers-ui.component';
import { SuppliersComponent } from './home/Files/components/suppliers/suppliers.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SalePaymentUIComponent } from './home/Sales/componentsShared/sale-payment-ui/sale-payment-ui.component';
import { SelectedSaleDetailUIComponent } from './home/Sales/componentsShared/selected-sale-detail-ui/selected-sale-detail-ui.component';
import { SalesTransactionComponent } from './home/Sales/components/sales-transaction/sales-transaction.component';
import { DatePipe } from '@angular/common';
import { SalesReceiptUIComponent } from './home/Sales/components/sales-receipt-ui/sales-receipt-ui.component';
import { EditSalesRecordsComponent } from './home/Sales/components/edit-sales-records/edit-sales-records.component';
import { SalesAddItemToReceiptUIComponentComponent } from './home/Sales/componentsShared/sales-add-item-to-receipt-uicomponent/sales-add-item-to-receipt-uicomponent.component';
import { PrintComponent } from './layouts/print/print.component';
import { PrintReceiptsComponent } from './layouts/print-receipts/print-receipts.component';
import { PrintReceiptComponent } from './layouts/print-receipt/print-receipt.component';
import { AllButtonsComponent } from './layouts/all-buttons/all-buttons.component';
import { EditReceivingRecordsComponent } from './home/receiving/components/edit-receiving-records/edit-receiving-records.component';
import { ReceivingReceiptsComponent } from './home/receiving/components/receiving-receipts/receiving-receipts.component';
import { ReceivingTransactionsComponent } from './home/receiving/components/receiving-transactions/receiving-transactions.component';
import { SelectedReceivingDetailUiComponent } from './home/receiving/componentsShared/selected-receiving-detail-ui/selected-receiving-detail-ui.component';
import { ReceivingPaymentUIComponent } from './home/receiving/componentsShared/receiving-payment-ui/receiving-payment-ui.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardUIComponent } from './dashboard-ui/dashboard-ui.component';
import { ProtectedComponent } from './protected/protected.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { MainUIComponent } from './main/main-ui/main-ui.component';
import { CutofftimecardsComponent } from './attendance/cutofftimecards/cutofftimecards.component';
import { UserProfileUIComponent } from './user-profile-ui/user-profile-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FooterComponent,
    ItemsComponent,
    ItemUIComponent,
    CustomersComponent,
    CustomerUIComponent,
    SuppliersUiComponent,
    SuppliersComponent,
    SalesTransactionComponent,
    SalePaymentUIComponent,
    SelectedSaleDetailUIComponent,
    SalesReceiptUIComponent,
    EditSalesRecordsComponent,
    SalesAddItemToReceiptUIComponentComponent,
    PrintComponent,
    PrintReceiptsComponent,
    PrintReceiptComponent,
    AllButtonsComponent,
    ReceivingPaymentUIComponent,
    EditReceivingRecordsComponent,
    ReceivingReceiptsComponent,
    ReceivingTransactionsComponent,
    SelectedReceivingDetailUiComponent,
    LoginComponent,
    RegisterComponent,
    DashboardUIComponent,
    ProtectedComponent,
    PageNotFoundComponent,
    LineChartComponent,
    NavbarComponent,
    EmployeesComponent,
    MainUIComponent,
    CutofftimecardsComponent,
    UserProfileUIComponent,
  
  
  
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [DatePipe
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

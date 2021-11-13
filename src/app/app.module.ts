import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing';

import { AppComponent } from './app.component';
import { BillingComponent } from './components/billing/billing.component';
import { CounterComponent } from './components/counter/counter.component';
import { ProductPagingComponent } from './components/product-paging/product-paging.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutBtnDirective } from './directives/checkout-btn.directive';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ProductPagingComponent,
    ProductComponent,
    CheckoutBtnDirective,
    BillingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

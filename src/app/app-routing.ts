import { Routes } from '@angular/router';
import { BillingComponent } from './components/billing/billing.component';
import { ProductPagingComponent } from './components/product-paging/product-paging.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'shopping'
    },
    {
        path: 'shopping',
        component: ProductPagingComponent
    },
    {
        path: 'billing',
        component: BillingComponent
    }
]
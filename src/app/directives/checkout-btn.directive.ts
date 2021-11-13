import { Directive, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductPagingComponent } from '../components/product-paging/product-paging.component';
import { ProductSelectionManagerService } from '../services/product-selection-manager.service';

@Directive({ selector: '[checkoutBtnDir]' })
export class CheckoutBtnDirective {
    private sub: Subscription;
    constructor(private el: ElementRef, private host: ProductPagingComponent, private psms: ProductSelectionManagerService) { 
        this.sub = new Subscription();    
    }
    
    ngOnInit(){
        this.sub = this.psms.isListEmpty$.subscribe((isEmpty: boolean)=>{
            if(isEmpty){
                this.el.nativeElement.disabled = true;
                this.host.isCheckedOutSub.next(false);
            } else {
                this.el.nativeElement.disabled = false;
            }
        })
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
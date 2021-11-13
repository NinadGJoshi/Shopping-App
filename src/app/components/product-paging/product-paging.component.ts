import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ProductSelectionManagerService } from 'src/app/services/product-selection-manager.service';
import { ProductsDataProviderService } from 'src/app/services/products-data-provider.service';

@Component({
  selector: 'product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss']
})
export class ProductPagingComponent implements OnInit {

  public productList: Array<any> = [];
  public displayList: Array<any> = [];
  public currentIndex: number = 0;
  public productList$: Observable<any>;
  private subs: Array<Subscription> = [];
  public isCheckedOutSub: Subject<boolean>; 
  public isCheckedOut$: Observable<boolean>;
  constructor(
    private pdps: ProductsDataProviderService,
    private router: Router,
    public psms: ProductSelectionManagerService,
    ) {
      this.productList$ = this.psms.getObservableOfList();
      this.isCheckedOutSub = new Subject();
      this.isCheckedOut$ = this.isCheckedOutSub.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
    }

  public onCheckout(): void {
    const cart = this.productList.filter((product)=>{
      if(this.psms.contains(product.id)){
        return product;
      }
    });
    this.isCheckedOutSub.next(true)
  }

  public loadNextProduct(): void {
    this.productList[this.currentIndex] = this.displayList[0];
    this.currentIndex += 1;
    this.displayList = this.productList.slice(this.currentIndex, this.currentIndex + 5);
  }
  
  public loadPrevProduct(): void {
    this.productList[this.currentIndex + 4] = this.displayList.slice(-1)[0];
    this.currentIndex -= 1;
    this.displayList = this.productList.slice(this.currentIndex, this.currentIndex + 5);
  }

  public onCartClick(): void {
    const selectedProductsList = this.productList.filter(item=> (item.quantity > 0 && this.psms.contains(item.id)))
    this.router.navigate(['../billing'], {
      queryParams: {
        selectedItems: JSON.stringify(selectedProductsList)
      }

    });
  }

  ngOnInit(): void {
    const sub = this.pdps.getProductsData().subscribe(val=> {
      this.productList = val['products'];
      this.displayList = this.productList.slice(0,5);
    });
    this.subs.push(sub);
  }

  ngOnDestroy(){
    this.psms.flush();
    this.subs.forEach(sub=> sub.unsubscribe());
  }
}

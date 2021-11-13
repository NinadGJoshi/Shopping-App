import { Component, Input, OnInit } from '@angular/core';
import { ProductSelectionManagerService } from 'src/app/services/product-selection-manager.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input('data')
    productInfo: any;

  constructor(private psms: ProductSelectionManagerService) { }

  onCounterChanged(event: any):void{
    this.productInfo.quantity = event;
    if(this.productInfo.quantity > 0 && !this.psms.contains(this.productInfo.id)){
      this.psms.add(this.productInfo.id);
    } else if(this.productInfo.quantity === 0 && this.psms.contains(this.productInfo.id)){
      this.psms.remove(this.productInfo.id);
    }
  }

  ngOnInit(): void {
  }

}

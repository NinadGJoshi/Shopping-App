import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  public cartItems: any = [];
  public totalAmt: number = 0;
  constructor(private route: ActivatedRoute) {
  }

  private getBillAmt(): number {
    return this.cartItems.reduce((amt: number, item: any)=>{
      amt += (parseInt(item.quantity)*parseInt(item.price));
      return amt
    }, 0)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(val=> {
      this.cartItems = JSON.parse(val.selectedItems);
    })
    this.totalAmt = this.getBillAmt();
  }

}

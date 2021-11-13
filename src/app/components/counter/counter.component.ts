import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input('initValue')
  public count!: number;
  @Output()
  public countChanged: EventEmitter<number>;

  constructor() {
    this.countChanged = new EventEmitter();
  }

  public incrementCount(): void{
    this.countChanged.emit(++this.count);
  }

  public decrementCount(): void{
    this.countChanged.emit(--this.count);
  }

  ngOnInit(): void {
  }

}

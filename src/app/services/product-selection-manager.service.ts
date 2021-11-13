import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class ProductSelectionManagerService {
    constructor() {
        this.productSet = new Set<any>();
        this.isListEmptySub = new BehaviorSubject(true);
        this.isListEmpty$ = this.isListEmptySub.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
    }
    private productSet: Set<any>;
    private isListEmptySub: BehaviorSubject<boolean> | any;
    public isListEmpty$: Observable<boolean>;

    public add(product: any): void {
        this.productSet?.add(product);
        if(this.productSet.size){
            this.isListEmptySub.next(false);
        } else {
            this.isListEmptySub.next(true);
        }
    }

    public remove(product: any): void {
        this.productSet?.delete(product);
        if(this.productSet.size){
            this.isListEmptySub.next(false);
        } else {
            this.isListEmptySub.next(true);
        }
    }

    public contains(product: any): boolean {
        return this.productSet.has(product);
    }

    public getSelectedProducts(): Array<any> {
        const arr: Array<any> = Array.from(this.productSet);
        return arr;
    }

    public getObservableOfList(): Observable<any> {
        return of(this.productSet).pipe(
            distinctUntilChanged()
        );
    }

    public flush(): void {
        this.productSet.clear();
        this.isListEmptySub.next(true);
    }
}
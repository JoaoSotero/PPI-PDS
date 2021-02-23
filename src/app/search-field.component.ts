import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PartialObserver } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-field',
  templateUrl: "./search-field.component.html",
  styleUrls: ["./search-field.component.css"]
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  control = new FormControl();
  private _subscription: Subscription;

  @Input() loading = false;
  @Input() public observer: PartialObserver<string>;

  ngOnInit(): void {
    this._subscription = this.control.valueChanges.subscribe(this.observer);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}

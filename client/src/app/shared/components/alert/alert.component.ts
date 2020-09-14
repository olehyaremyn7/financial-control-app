import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  template: `<div class="alert-wrap" *ngIf="text">
                <div class="alert" [ngClass]="{
                        'alert-success': type === 'success',
                        'alert-warning': type === 'warning',
                        'alert-danger': type === 'danger'
                        }">
                        <p>{{ text }}</p>
                </div>
            </div>`,
  styles: [`.alert-wrap {
                position: fixed;
                top: 50px;
                right: 40px;
                max-width: 300px;
                margin: 20px auto;
            }

            .alert-wrap p {
                margin-top: 10px;
            }`]
})

export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 2000;

  public text: string;
  public type = 'success';
  alertSubscription: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

}

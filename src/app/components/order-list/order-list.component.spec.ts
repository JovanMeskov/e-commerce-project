import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderListComponent } from './order-list.component';
import {HttpClientModule} from "@angular/common/http";

describe('OrderListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        OrderListComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(OrderListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

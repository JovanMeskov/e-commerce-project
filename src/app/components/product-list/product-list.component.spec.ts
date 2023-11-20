import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductListComponent} from './product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "../../services/product.service";
import {MatIconModule} from "@angular/material/icon";

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatIconModule
      ],
      declarations: [
        ProductListComponent
      ],
      providers: [
        {provide: ProductService, useValue: productService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

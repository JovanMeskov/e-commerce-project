import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'state', 'active', 'createdAt', 'updatedAt'];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getOrders().subscribe(
      (data: any) => {
        console.log("orders: ", data)
        this.orders = data?.data?.activeOrders;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}

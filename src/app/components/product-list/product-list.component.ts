import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  sortedData: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.populateProducts();
  }

  populateProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.data.products.items;
        this.sortedData = this.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openProductDetails(id: number) {
    this.router.navigate(['product-detail', id]);
  }

  addToCard(id: any) {
    this.productService.addToCard(id).subscribe(() => {
      const customPopup = document.getElementById('customPopup');
      if (customPopup) {
        customPopup.style.display = 'flex';
        setTimeout(() => {
          customPopup.style.display = 'none';
        }, 1000000);
      }
    });
  }

  closePopup() {
    const customPopup = document.getElementById('customPopup');

    if (customPopup) {
      customPopup.style.display = 'none';
    }
  }

  openOrdersList() {
    this.router.navigate(['order-list']);
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  filterProducts($event: KeyboardEvent) {
    // @ts-ignore
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.sortedData = this.products.filter((o: { [x: string]: string }) =>
      Object.keys(o).some((k) => o[k].toLowerCase().includes(filterValue.toLowerCase())));
  }
}

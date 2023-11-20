import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://demo.vendure.io/shop-api';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    const query = `
query {
  products(options: { take: 5 }) {
    totalItems
    items {
      id
      name
    }
  }
}`;
    return this.http.post(`${this.apiUrl}/graphql`, {query});
  }

  getProductDetails(id: number): Observable<any> {
    const query = `
    query {
      product(id: ${id}) {
       id
      name
      slug
      description
      featuredAsset {
        id
        preview
      }
      }
    }`;
    return this.http.post(`${this.apiUrl}/graphql`, {query});
  }

  addToCard(id: number) {
    const query = `
    mutation {
  addItemToOrder(productVariantId: 42, quantity: 1) {
    ...on Order {
      id
      code
      totalQuantity
      totalWithTax
      lines {
        productVariant {
          name
        }
        quantity
        linePriceWithTax
      }
    }
    ...on ErrorResult {
      errorCode
      message
    }
  }
}`;
    return this.http.post(`${this.apiUrl}/graphql`, {query});
  }

  getOrders() {
    const username = 'superadmin';
    const password = 'superadmin';
    const query = `query ActiveOrder {
    activeOrder {
        id
        state
      active
      createdAt
      updatedAt
    }
}`;
    const body = {username, password, query}

    return this.http.post(`${this.apiUrl}`, {query});
  }
}

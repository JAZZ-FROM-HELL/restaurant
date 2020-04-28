import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/items');
  }

  public postItem(item: Item): Observable<Item> {
    return this.http.post<Item>('/api/items', item);
  }

  public postToShoppingCart(): Observable<String> {
    return this.http.post<string>('/api/shopping-cart', '');
  }

}

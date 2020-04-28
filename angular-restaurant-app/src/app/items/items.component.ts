import { Component, OnInit } from '@angular/core';
import { Item } from './item.entity';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  static PATH = 'items';

  items: Item[] = [];
  itemSubmitted = false;
  itemForm: FormGroup;

  constructor(private itemService: ItemsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => this.items = items);

    // Initiating the form with the fields and the required validators
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required], // Name is required
      price: ['', [Validators.required, Validators.min(0)]] // price is required
    });
  }


  addToCart() {
    this.itemService.postToShoppingCart().subscribe({
      next(data) {
        const success:string = JSON.parse(JSON.stringify(data)).success;
        console.log('Success: ' + success);
        window.alert('Success: ' + success);
      },
      error(err) {
        console.log(err.error.message || err.error.text);
        window.alert('Error: ' + (err.error.message || err.error.text));
      }
    });
  }

  addNewItem() {

    this.itemSubmitted = true;
    if (!this.itemForm.invalid) {
      this.itemService.postItem(this.itemForm.value).subscribe((res) =>{
        this.items.push(res);
      }, error => {
        window.alert(error.error.message);
      });
    }
  }

  get getItemForm() {
    return this.itemForm.controls;
  }

}

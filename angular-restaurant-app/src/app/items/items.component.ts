import { Component, OnInit } from '@angular/core';
import { Item } from './item.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
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
    //window.alert('Added');
    this.itemService.postToShoppingCart().subscribe(response => {
      window.alert(response);
    }, error => {
      window.alert(error.error.message || error.error.text);
      console.log(error);
    })
  }

  addNewItem() {
    this.itemSubmitted = true;
    if (!this.itemForm.invalid) {
      this.itemService.postItems(this.itemForm.value).subscribe(response =>{
        window.location.reload();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }

  get getItemForm() {
    return this.itemForm.controls;
  }

}

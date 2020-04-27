import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemsComponent} from './items.component';
import {User} from "../users/user";
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {ItemsService} from "./items.service";
import {Item} from "./item.entity";
import {items, getNewItemId} from "./items.mock";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {BrowserModule, By} from "@angular/platform-browser";

describe('ItemsComponent', () => {

  let itemsService:ItemsService;
  let comp:ItemsComponent;
  let fixture:ComponentFixture<ItemsComponent>;
  let cp:CurrencyPipe;
  let compiled:any;
  let postItemSpy;

  const mockUser:User = {
    id: 1,
    username: 'john',
    password: 'changeme',
    firstName: 'John',
    lastName: 'Kreese',
  }

  beforeEach( async( () => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent,
      ],
      imports: [
        HttpClientModule,ReactiveFormsModule,BrowserModule,
      ],
      providers: [
        FormBuilder,CurrencyPipe,
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    cp = TestBed.inject(CurrencyPipe);
    itemsService = TestBed.inject(ItemsService);
    spyOn(itemsService, 'getItems').and.returnValue(of<Item[]>(items));
    postItemSpy = spyOn(itemsService, 'postItem').and.callFake((item:Item) => {
        return of({...item, id: getNewItemId()})
    });
    spyOn(itemsService, 'postToShoppingCart').and.returnValue(of('Item posted!'));
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(ItemsComponent);
    fixture.detectChanges();
    comp = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should render mock items onLoad', async(() => {
    // table
    let tableRows = compiled.querySelectorAll('tr');
    expect(tableRows.length).toBe(items.length + 1);

    // header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe('Name');
    expect(headerRow.cells[1].innerHTML).toBe('Price');
    expect(headerRow.cells[2].innerHTML).toBe('Action');

    // table body
    for (let i=0; i<items.length; i++) {
      let row = tableRows[i+1];
      expect(row.cells[0].innerHTML).toBe(items[i].name);
      expect(row.cells[1].innerHTML).toBe(cp.transform(items[i].price));
      expect(row.cells[2].querySelector('button').textContent).toBe('Add to shopping cart')
    }
  }));

  it('form invalid when empty', () => {
    expect(comp.itemForm.valid).toBeFalsy();
  });

  it('name field invalid by default', () => {
    expect(comp.itemForm.controls['name'].valid).toBeFalsy();
  });

  it('name field required', () => {
    let name = comp.itemForm.controls['name'];
    let errors = name.errors || {};
    expect(errors.required).toBeTruthy();
  });

  it('name field filled', () => {
    let name = comp.itemForm.controls['name'];
    name.setValue("test");
    let errors = name.errors || {};
    expect(errors.required).toBeFalsy();
  });

  it('name field invalid by default', () => {
    expect(comp.itemForm.controls['price'].valid).toBeFalsy();
  });

  it('price field required', () => {
    let price = comp.itemForm.controls['price'];
    let errors = price.errors || {};
    expect(errors.required).toBeTruthy();
  });

  it('price field negative invalid', () => {
    let name = comp.itemForm.controls['price'];
    name.setValue(-3);
    let errors = name.errors || {};
    expect(errors.min).toBeTruthy();
  });

  it('price field positive valid', () => {
    let name = comp.itemForm.controls['price'];
    name.setValue(2);
    let errors = name.errors || {};
    expect(errors.required).toBeFalsy();
    expect(errors.min).toBeFalsy();
  });

  it('valid form submit should render added item', async(() => {
    let count = comp.items.length;

    expect(comp.itemForm.valid).toBeFalsy();
    comp.itemForm.controls['name'].setValue('Hummus');
    comp.itemForm.controls['price'].setValue(3);
    expect(comp.itemForm.valid).toBeTruthy();

    compiled.querySelector('.btn-primary').click(); // submit button clicked

    //expect(postItemSpy).toHaveBeenCalledTimes(1).then(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(comp.items.length).toBe(count + 1);

      let newRow = compiled.querySelector(`table tr:nth-child(${comp.items.length}`); // the new item's row
      expect(newRow.cells[0].innerHTML).toBe('Hummus');
      expect(newRow.cells[1].innerHTML).toBe(cp.transform(3));
    });
  }));

  it('Submit receives error from server', ()=> {
    // TODO: implement
  });

});

import {browser, by, element, logging, protractor} from 'protractor';
import {LoginPage} from './login.po';
import {ItemsPage} from "./items.po";
import {App} from "./app.e2e-spec";
import {CurrencyPipe} from "@angular/common";


describe('Items', () => {
  let app:App
  let loginPage: LoginPage;
  let itemsPage: ItemsPage;

  beforeEach(() => {
    app = new App();
    loginPage = new LoginPage();
    itemsPage = new ItemsPage();
  });

  it('items should redirect to login and back', () => {
    app.navigateTo('items');
    expect(browser.getCurrentUrl()).toContain(loginPage.getEndpoint());
    loginPage.submitLogin({username: 'john', password: 'changeme'});
    expect(browser.getCurrentUrl()).toContain(itemsPage.getEndpoint());
  });

  // user john logged in
  it('new item form submitted empty - should display error and not submit', () => {
    app.navigateTo('items');
    expect(browser.getCurrentUrl()).toContain(itemsPage.getEndpoint());
    let beforeCount = itemsPage.countItems();
    itemsPage.getNewItemName().clear();
    itemsPage.getNewItemPrice().clear();
    expect(itemsPage.getNewItemNameError().isPresent()).toBe(false);
    expect(itemsPage.getNewItemPriceError().isPresent()).toBe(false);
    itemsPage.getNewItemSubmitButton().click();
    expect(itemsPage.getNewItemNameError().isPresent()).toBe(true);
    expect(itemsPage.getNewItemPriceError().isPresent()).toBe(true);
    expect(itemsPage.countItems()).toEqual(beforeCount);
  });

  it('price field allows digits only', () => {
    app.navigateTo('items');
    itemsPage.getNewItemPrice().clear();
    itemsPage.getNewItemPrice().sendKeys(10);
    expect(itemsPage.getNewItemPrice().getAttribute('value')).toEqual('10');
    itemsPage.getNewItemPrice().sendKeys('aaa');
    expect(itemsPage.getNewItemPrice().getAttribute('value')).toEqual('10');
  });

  // user john logged in and on /items
  it('items should add and display item',  () => {
    app.navigateTo('items');
    let beforeCount:number;
    itemsPage.countItems().then((count) => {
      beforeCount = count;
      let addItem = { name: `Johns favorite ${(beforeCount)}`, price: 5 };
      itemsPage.getNewItemName().sendKeys(addItem.name);
      itemsPage.getNewItemPrice().sendKeys(addItem.price);
      itemsPage.getNewItemSubmitButton().click();
      expect(itemsPage.getNewItemNameError().isPresent()).toBe(false);
      expect(itemsPage.getNewItemPriceError().isPresent()).toBe(false);
      expect(itemsPage.countItems()).toEqual(beforeCount + 1)
      expect(itemsPage.getLastItemName()).toEqual(addItem.name);
      expect(itemsPage.getLastItemPrice())
        .toEqual(new CurrencyPipe('en','USD')
          .transform(addItem.price.toString()));
    });

  });

});

import {browser, by, element} from "protractor";
import {promise as wdpromise} from "selenium-webdriver";

export class ItemsPage {

  getEndpoint():string {
    return '/items';
  }

  getNewItemName() {
    return element(by.css('[ng-reflect-name="name"]'));
  }

  getNewItemNameError() {
    return element(by.css('.nameError'));
  }

  getNewItemPrice() {
    return element(by.css('[ng-reflect-name="price"]'));
  }

  getNewItemPriceError() {
    return element(by.css('.priceError'));
  }

  getNewItemSubmitButton() {
    return element(by.css('button[type=submit]'));
  }

  countItems():wdpromise.Promise<number> {
    return element.all(by.css('table tbody tr')).count();
  }

  getLastItemName() {
    return element(by.css('tbody > tr:last-child > td:first-child')).getText();
  }

  getLastItemPrice() {
    return element(by.css('tbody > tr:last-child > td:nth-child(2)')).getText();
  }

}

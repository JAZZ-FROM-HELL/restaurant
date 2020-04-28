import {browser, by, element} from "protractor";

export class HomePage {

  getEndpoint():string {
    return '/';
  }

  getTitleText() {
    return element(by.css('h4')).getText();
  }

  getName() {
    return element(by.css('.card-body ul li')).getText();
  }


}

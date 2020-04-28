import {browser, by, element} from "protractor";

export class LoginPage {

  getEndpoint():string {
    return 'login';
  }

  getTitleText() {
    return element(by.css('app-root .card-header')).getText();
  }

  submitLogin(credentias) {
    element(by.css('[ng-reflect-name="username"]')).sendKeys(credentias.username);
    element(by.css('[ng-reflect-name="password"]')).sendKeys(credentias.password);
    element(by.css('.btn-primary')).click();
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }


}

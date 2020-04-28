import {browser, by, element, logging, protractor} from 'protractor';
import {LoginPage} from './login.po';
import {HomePage} from "./home.po";
import {ItemsPage} from "./items.po";

export class App {
  navigateTo(endpoint): Promise<unknown> {
    return browser.get(`${browser.baseUrl}${endpoint}`) as Promise<unknown>;
  }
}

describe('App', () => {
  let app:App
  let loginPage: LoginPage;
  let homePage: HomePage;
  let itemsPage: ItemsPage;

  beforeEach(() => {
    app = new App();
    loginPage = new LoginPage();
    homePage = new HomePage();
    itemsPage = new ItemsPage();
  });

  // protected root url should redirect to login page when user is not logged in
  it('home redirect to login', () => {
    app.navigateTo('');
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + loginPage.getEndpoint());
  });

  it('login should display welcome message', () => {
    app.navigateTo('');
    expect(loginPage.getTitleText()).toEqual('Angular 8 JWT Login Example');
  });

  it('login wrong credentials', () => {
    app.navigateTo('');
    loginPage.submitLogin({username: 'john', password: 'wrong'});
    expect(loginPage.getErrorMessage()).toEqual('Invalid username or password');
  });

  it('login right credentials', () => {
    app.navigateTo('');
    loginPage.submitLogin({username: 'john', password: 'changeme'});
    expect(browser.getCurrentUrl()).toContain(homePage.getEndpoint());
  });

  // user is logged in and at home
  it('home should contain title and user firstName lastName', () => {
    expect(homePage.getTitleText()).toBe('You\'re logged in with Angular 8 & JWT!!');
    expect(homePage.getName()).toBe('john kreese');
  });

  // test app routing & navigation
  it('navigation successful', () => {
    expect(homePage.getTitleText()).toBe('You\'re logged in with Angular 8 & JWT!!');
    element(by.css('a[routerlink=items]')).click(); // navigate to items
    expect(browser.getCurrentUrl()).toContain(itemsPage.getEndpoint());
    element(by.css('a[routerlink=home]')).click(); // navigate to home
    expect(browser.getCurrentUrl()).toContain(homePage.getEndpoint());
  });

  it('logout successful, redirects to login', () => {
    element(by.css('a.logout')).click(); // logout
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + loginPage.getEndpoint());
  });

  afterEach(async () => {

    // Assert that there are no errors emitted from the browser, except 401/403
    /*
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
    */
  });

});

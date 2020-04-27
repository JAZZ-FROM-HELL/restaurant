import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {HomeComponent} from "./home.component";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../users/user.service";
import {User} from "../users/user";
import {of} from "rxjs";

describe('HomeComponent', () => {

  let userService:UserService;
  let comp:HomeComponent;
  let fixture:ComponentFixture<HomeComponent>;

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
        HomeComponent,
      ],
      imports: [
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  beforeEach( () => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getUser').and.returnValue(of<User>(mockUser));
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    comp = fixture.debugElement.componentInstance;
  });

  it('should have as title "You\'re logged in with Angular 8 & JWT!!"', async(() => {
    expect(comp.title).toEqual('You\'re logged in with Angular 8 & JWT!!');
  }));

  it('should render in li mock user "firstName lastName"', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent)
      .toEqual(`${mockUser.firstName} ${mockUser.lastName}`);
  }));

});

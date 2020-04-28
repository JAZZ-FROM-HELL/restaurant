# mm-examples
<h3>Prepare DB:</h3>
<p>
With MySQL root user in default.env.json:<br/>
CREATE DATABASE restaurant_dev;<br/>
CREATE DATABASE restaurant_test;<br/>
</p>
<hr/>
<h3>Run:</h3>
<p>Inside each app folder:</p>
<h4>Server side - nest-restaurant-api</h4>
<p>npm start:dev<br/>
</p>
<h4>Client side - angular-restaurant-app</h4> 
<p>
ng serve --open<br/>
</p>
<hr/>

<h3>Test:</h3>
<p>Inside each app folder</p>
<h4>Server side unit test:</h4>
<p>npm run test</p>
<h4>Server side e2e test:</h4>
<p>npm run test:e2e</p>
<h4>Client side unit test:</h4>
<p>ng test</p>
<h4>Client side e2e test:</h4>
<p>
ng e2e<br/>
(Make sure nest-restaurant-app is running on port 3000)
</p>

<hr/>
<h3>Based on:</h3>
<p>
<a href="https://auth0.com/blog/full-stack-typescript-apps-part-1-developing-backend-apis-with-nestjs/">AUTH0 Example</a><br/><br/>
<a href="https://docs.nestjs.com/techniques/authentication">NestJS Authentication / Authorization</a><br/><br/>
<a href="https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial">Angular 8 - JWT Authentication Example & Tutorial</a><br/><br/>
<a href="https://github.com/nestjs/nest/tree/master/sample/05-sql-typeorm">SQL TypeORM Example</a><br/><br/>
<a href="https://docs.nestjs.com/interceptors">Logging interceptors</a><br/><br/>
<a href="https://docs.nestjs.com/fundamentals/testing">NestJS Testing (Unit testing with Jest, e2e testing with Supertest)</a><br/><br/>
<a href="https://docs.nestjs.com/techniques/configuration">NestJS Configuration</a><br/><br/>
<a href="https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/">Angular Testing with Mocks (Jasmine, Karma)</a><br/><br/>
<a href="https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/">Angular Forms Testing </a><br/><br/>
<a href="https://blog.cloudboost.io/building-your-first-tests-for-angular5-with-protractor-a48dfc225a75">Angular e2e testing with Proctrator</a><br/><br/>
</p>

<hr/>
See also README.md in each project.

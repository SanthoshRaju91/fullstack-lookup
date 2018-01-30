# Fullstack application

Being a fullstack developer or creating fullstack application means knowing everything (which is why the call it fullstack)

But starting with a fullstack application can be bit clumsy stuff, as it happened to me when I started exploring fullstack application. It's really not because the framework is so diffcult to master or become an expert. But rather the flexibility or easiness with which you can create a fullstack application.

This really happened to when I started, I knew the framework but did not have clear path on how I should proceed with in creating production ready fullstack application.

Pardon me, the community is so vibrant and supportive. But they all lead us to different directions and many scaffolding structures, it certainly confused me alot because I was rather looking for something simple where I tend to do more rather than changing the project scaffolding and its setup over and over again.

So I thought to myself, why not I help create a fullstack application which breaksdown the scaffolding (A simple one) which I have been using since 3 years.

## Tools used.

1. ES6 - I would generally prefer to use ES6, not because it's new and shine. But it makes the code more readable to your fellow developers and mostly importantly your future self.
2. Express - Go to framework for creating node based web applications.
3. MongoDB - Database.
4. Mongoose - Object Document Model (ODM) similar to ORM in Java, I prefer to use it because it's the most starred repo for ODM.

Before we start with developing project features / requirement, having a propert project setup is it's most important. Because I have seen developer wasting much of their focusing on this rather than the most important thing which is to build the project.

Hence spend your first inital time in setting the project and making it production ready as simple a just switching on switch.

First lets look at the server scaffolding / project structure.

### config/index.js

Perhaps the second most important file, on the applicaton. This file basically configures your entire application based on the environment right from 

- setting a Database URL
- configuring server PORT
- Reuse application configs

Always keep in mind that this is an environment based file. Remember the switch, this is exactly acts on it and the switch in our case is the `ENV` variable available in `process.env.ENV` which you would set on your server.

How is it really usefull - let me explain say we need to connect to a different database depending on where the application is served, below is how we achieve it.

```javascript
const ENV = process.env.ENV || 'development';

const DB_URL = (ENV === 'production') ? '<PROD_DB>' : '<DEV_DB>';
```

### config/db.js

Always a fan of separation of concerns, as you guessed this file is where you write you connection code and also export a function to close the connection.

### config/middleware.js

Express is so generous, that is allows us to integrate number of available middlewares in the present ecosystem. Integrating a middleware is as simple `app.use();`

Reason it is moved to its own file is again separation of concerns and having a `./index.js` (which is the maing entry point of the application and more on this below) is make it as small as possible, so a junior develper looking at it will not be intimidated by the sheer lines of the content.

Also this is where you will also configure you application cross-domain policy rules, which is basically a handshake protocol between a server and client, to validate whether the client is genious and not a hacker is disguise :).

Again how do you do it - 

```javascript

app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
})
``` 
or a better way of doing it is using `cors` node module

```javascript
app.use(cors());
```

### utils

Place where you add all your application utility functions, one such util that I usually create on the inital project setup is the logger.

Logging any application is where important, because to figure out a any errors in the project reported by users would usually resolve to a log file.

Please check the `server/utils/logger.js` file for implementation.

### modules

This is where you have write most of your code, because this where you develop your project modules. I prefer using a pod based approach, meaning I would structure my project requirement based on modules.

So you know exactly to look for, when you land in an issue.

One such module that I have created is workshop (Dance workshop). Inside this you will have

1. `mode.js` - Where your define your DB schema, mine is MongoDB.
2. `controller.js` - Where your write your business logic, saving data to DB and sending response back to the client.
3. `routes.js` - The operator, where it routes the requests to specified controller method to handle it's request.

And a main `index.js`, where is exports all the module's routes.

### ./bootstrap.js

Bootstrapping your application, I used this to create a logs folder, if does not exists. Similarly you can add your own application bootstraps here.

Please have this in mind, that this file should work based on `if and else` only.

### ./index.js

I can't stress more, but perhaps the most important file in your fullstack application. It is the file where the application's entry point.

Here we

1. Create an application instance.
2. Establishing DB connection.
3. Configuring all the middlewares.
4. Consolidating and configuring all the API's
5. Serve static files.
6. Global error handler.
7. Starting the app server and specified PORT, so it waits for handling requests.

Quite a big list right, now you know why it is The file in the application.

Please allow me to offer some pro-tips as I learnt via out the years.

<b>Server static files</b> - In a fullstack application, you can serve the backend and client on two different ports, but by doing so, we might land in a issue which haunts everyone. 

That is, Content Security policy. Please don't be intimidated, its simple as it doesn't sound to be. Ways you can fix it is by providing CSP rules which I discussed above in the `config/middleware.js` section.

Or taking the client dist / build folder and serving it from backend itself. Which shares the resource both on the same origin.

That is the advantage of using Express. You not only build API's but also serve static files.




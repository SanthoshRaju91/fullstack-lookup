# Fullstack application

Being a fullstack developer or creating fullstack application means knowing everything (which is why they call it fullstack)

But starting with a fullstack application can be bit clumsy stuff, as it happened to me when I started exploring fullstack application. It's really not because the framework is so diffcult to master or become an expert. But rather the flexibility or easiness with which the framework offers, putting you in a confused state of mind on which to use and which not to use.

This literally happened to me when I started, I knew the framework but did not have clear path on how I should proceed with it, in creating production ready fullstack application.

Pardon me, the community is really vibrant and supportive. But they all lead us to different directions and many scaffolding structures, it certainly confused me alot because I was rather looking for something simple where I tend to do more rather than changing the project scaffolding and its setup over and over again.

So I thought to myself, why not I help create a fullstack application which breaksdown the scaffolding (A simple one) which I have been using since 3 years.

## Tools used.

1. ES6 - I would generally prefer to use ES6, not because it's new and shiny. But it makes the code more readable to your fellow developers and most importantly your future self.
2. Express - Go to framework for creating node based web applications.
3. MongoDB - Database.
4. Mongoose - Object Document Model (ODM) similar to ORM in Java, I prefer to use it because it's the most starred repo for ODM based.

Before we start with developing project features / requirement, having a proper project setup is it's most important step. Because I have seen developers wasting much of their time focusing on this, rather than the most important thing which is to build the project.

Hence spend your first inital time in setting the project and making it production ready shoudl be as simple a just switching on switch.

First lets look at the server scaffolding / project structure.

### config/index.js

Perhaps the second most important file, on the applicaton. This file basically configures your entire application based on the environment right from 

- setting a Database URL
- configuring server PORT
- Reuse application configs

Always keep in mind that this is an environment based file. Remember the switch, this exactly acts on it and the switch in our case is the `ENV` variable available in `process.env.ENV` which you would set on your server.

How is it really useful - let me explain say we need to connect to a different database depending on where the application is hosted and below is how we achieve it.

```javascript
const ENV = process.env.ENV || 'development';

const DB_URL = (ENV === 'production') ? '<PROD_DB>' : '<DEV_DB>';
```

### config/db.js

Always a fan of separation of concerns, as you guessed this file is where you write you connection code and also export a function to close the connection.

### config/middleware.js

Express is so generous, that is allows us to integrate number of available middlewares in the present ecosystem. Integrating a middleware is as simple as `app.use();`

Reason it is moved to its own file is again separation of concerns and having a `./index.js` (which is the main entry point of the application and more on this below) is make it as small as possible, so a junior develper looking at it will not be intimidated by the sheer lines of the content.

Also this is where you will also configure you application cross-domain policy rules, which is basically a handshake protocol between a server and client, to validate whether the client is genuine and not a hacker is disguise :smile:.

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

There is plenty of options available to configure the CORS using this module. Please find it [here](https://www.npmjs.com/package/cors)

### utils

Place where you add all your application utility functions, one such utility that I usually create on the inital project setup is the logger.

Logging any application is where important, because to figure out any errors in the project reported by users would usually resolve to a log file.

Please check the `server/utils/logger.js` file for implementation. And whereever you need to log, use one of the appropriate methods to do so.

### modules

This is where you have write most of your code, because this is where you develop your project modules. I prefer using a pod based approach, meaning I would structure my project requirement based on modules.

So you know exactly where to look for, when you land in an issue.

One such module that I have created is workshop (Dance workshop). Inside this you will have

1. `model.js` - Where your define your DB schema, mine is MongoDB.
2. `controller.js` - Where your write your business logic, saving data to DB and sending response back to the client.
3. `routes.js` - The operator, where it routes the requests to specified controller method to handle it's request.

And a main `index.js`, where is exports all the module's routes.

### ./bootstrap.js

Bootstrapping your application, I used this to create a logs folder, if does not exists. Similarly you can add your own application bootstraps here.

Please have this in mind, that this file should work based on `if and else` only.

### ./index.js

I can't stress more, but perhaps the most important file in your fullstack application. It is The file where the application's starts executing.

Here we

1. Create an application instance.
2. Establishing DB connection.
3. Configuring all the middlewares.
4. Consolidating and configuring all the API's
5. Serve static files.
6. Global error handler.
7. Starting the app server and specified PORT, so it waits for handling requests.

Quite a big list right, now you know why it is The file in the application.

### Please allow me to offer some pro-tips as I learnt via out the years.

<b>Server static files</b> - In a fullstack application, you can serve the backend and client on two different ports, but by doing so, we might land in a issue which haunts everyone. 

That is, Content Security policy. Please don't be intimidated, it is simple as it doesn't sound to be. Ways you can fix it is by providing CSP rules which I discussed above in the `config/middleware.js` section.

Or taking the client dist / build folder and serving it from backend itself. Which shares both the resources on the same origin.

That is the advantage of using Express. You not only build API's but also serve static files.

<b>Global error handler</b> - If you have an error at any part of the application, one way to not crash the application is to add error handlers.

But with a codebase which can span to a large extent, having a error handler all over the place only increases your worry in finding where is the issue.

One way to resolve this issue is to use a global error handler in the `index.js`

```javascript

app.use((err, req, res, next) => {
    if(err) {
        logger.error(`Error: ${err}`);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
    next();
})
```

Now when you write your code, wrapping it in a `try catch` block and throw the err in your catch block is all you need to do. 

The above handler catches the error and resolve them accordingly as the logic you have given.

How does it do it - well the above code you see is another form of express middleware where in this case it a global middleware.

You can also write inline / isolated / constrained middlewares as

```javascript
app.all('/api/', auth(), [routes]);
```

Take that as an example for authenticating your routes.

Please don't forget to use next() in your middleware's or else your client will be waiting all day for the results.

<b>Note:</b> Please check the order where the above method is placed, because if this is placed before your routes configuration this will not work.

<b>Use defaults </b> - Not only in here, but any programming language. Try to assign your variable with default values, so there is less chance of crashing your application.

```javascript
const ENV = process.env.ENV || 'development';
```

<b> async / await </b> - Javscript which it is asynchronous in nature, you would come around various API which are promised.

So to resolve them you would normally use `.then()`. But what if you need to perform another async operation on the fetched results like

```javascript

fetchUser()
    .then(repsonse => {
        fetchBooks(response.userID)
            .then(booksResponse => {

            })
    })
```

This is called promise pyramid in contrast to callback hell. Of course you can use promise chain to chain them, but I have a more simpler one, which improves the code readability as well. So refactoring the above code with `async / await`

```javascript
async function getUserbooks() {
    try {
        let user = await fetchUser();
        let books = await fetchBooks(user.userID);
        console.log(books);
    } catch (err) {
        throw err;
    }
}
```

More neat right. I couldn't feel more happier than this, async await landing with ES6 (Make no mistake, it is still async code with Promise, but a more cleaner API to write async code)

Now, with these quick tips and brief about the backend scaffolding, I would not like to continue with the client side, because we have many options to do so.

Usually I use react.js for my client side - you can use the [create react app](https://github.com/facebook/create-react-app) by this awesome person Dan Abramov. Or if you feel you want more freedom you can do so by creating your own scaffolding.

Angular 2 - Please use Angular CLI [ng cli](https://cli.angular.io/)

Ember - It's world's best cli among the frameworks [ember-cli](https://ember-cli.com/)

Vue - New kid on the block [Vue-cli](https://github.com/vuejs/vue-cli)

Its your option to choose from.

### Thank you

If you find this really helpful, please leave a :star:. So that I can appear at the next react.js meetup as a speaker :wink:.

If you find any errors or suggestion that would help this documentation or making the code much better, please feel free to raise a PR. I would be delighted to merge it.

And a PR can't get any easier than this, so open source contribution is now offically open.

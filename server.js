const express = require('express');
const hbs = require('hbs'); //help in injecting data in static html page
const fs = require('fs');

const app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partial');  // for same html element

// Anything we render from this function is going to get rendered in place of getCurrentYear.
hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
});    

// helper with argument
hbs.registerHelper('screamIt', text => {
    return text + "RETURED TEXT !!!";
});


// This middleware is logging the request info in file server.log file
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', err =>{
        if(err)
            console.log("Can't append log to the file !!!");
        else
            console.log("log appended to the file !!!");    
    } );
    next();
});


// in express middleware order of the middle ware matter to get maintain.hbs on help.html request put its below 
// mainatin .hbs middleware command 
app.use((req, res, next) => {
    res.render('maintain.hbs');
});


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    // res.send("<h1>Hello Express</h1>");
    // res.send({
    //     name : 'mani',
    //     age : 22
    // });
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        someText : "Welcome Buddy"
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');

    // res.render('about.hbs');  // with static html page withput dynamic template

    // res.render('about.hbs', {
    //     pageTitle : 'About Page',
    //     currentYear : new Date().getFullYear()   user hbd function for dynamically render the data
    // });

    res.render('about.hbs', {
        pageTitle : 'About Page'
    });

});

app.get('/bad', (req, res) => {
    res.send({
        code : 404,
        message : "server not working"
    });
});

app.listen(3000 , () => {
    console.log('Server is up on port 3000');
});
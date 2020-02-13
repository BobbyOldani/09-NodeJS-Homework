const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const pdfDocument = require("html-pdf");
let color;
const questions = [
    {
        type: 'input',
        message: 'Please enter your GitHub username:',
        name: 'username'
    },

    {
        type: 'list',
        message: 'Choose a color',
        name: 'color',
        choices: ['green', 'blue', 'pink', 'red']
    }
];


function init() {
inquirer
    .prompt(questions)
    .then(function(responses) {
        color = responses.color
        const username = responses.username
        const queryUrl1 = `https://api.github.com/users/${username}`;
        const queryUrl2 = `https://api.github.com/users/${username}/starred`; 
        const request1 = axios.get(queryUrl1);
        const request2 = axios.get(queryUrl2);

        axios.all([request1, request2]).then(axios.spread((...responses) => {
            const res1 = responses[0];
            const res2 = responses[1];
            const stars = res2.data.length;
            const data = res1.data
            //console.log(res1);
            console.log("You got stars!: " + stars);
            let userCompany = data.company
            if (userCompany === null) {
                userCompany = "Unknown Employment"
            }
            //variable checking company goes here. if data.company is null then company = this person has no job...
             const user = {
                 "avatar": data.avatar_url,
                 "githubUrl": data.html_url,
                 "name": data.name,
                 "company": userCompany, // set equal to variable that checks up above on line 38
                 "blog": data.blog,
                 "location": data.location,
                 "bio": data.bio,
                 "repos": data.public_repos,
                 "following": data.following,
                 "followers": data.followers,
                 "color": color,
                 "stars": stars
             }
             //console.log(user);
             return generateHTML(user);
        }))
        .then(function(userReturn) {
            //console.log(userReturn);
            fs.writeFile("index.html", userReturn, function(err){
                if(err) throw err;
                console.log("WOHOOO!")
                return writeToFile("index.html", userReturn);
            })
        })
        .catch (function(err) {
            console.log(err);
        })
        // .then (function() {
        //     let html = fs.readFileSync('index.html', 'utf8');
        //     let options = { format: 'Letter'}
        //     pdfDocument.create(html, options).toFile('./page.pdf', function(err, res) {
        //       if (err) return console.log(err);  
        //       console.log("html to pdf")
        //     })

        // })
    })
};

function writeToFile(filename, data) {
    let html = fs.readFileSync('index.html', 'utf8');
    let options = { format: 'Letter', orientation:'portrait'}
    pdfDocument.create(html, options).toFile('./page.pdf', function(err, res) {
        if (err) return console.log(err);  
        console.log("html to pdf")
    })
}


 init();
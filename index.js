const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
// require("dotenv").config();
let color

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
        const queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
        //const newQueryUrl = `https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
    
        //  axios.get(queryUrl).then((res1) => {axios.get(newQueryUrl).then((res2.data) => {generateHTML(res) 

        axios.get(queryUrl) 
        .then(function(res1){
            const data = res1.data
            console.log(data);
             const user = {
                 "avatar": data.avatar_url,
                 "githubUrl": data.html_url,
                 "name": data.name,
                 "company": data.company, // possibly a function company() passing through data.company
                 "blog": data.blog,
                 "location": data.location,
                 "bio": data.bio,
                 "repos": data.public_repos,
                 "following": data.following,
                 "followers": data.followers,
                 "color": color
             }
             console.log(user);
             return generateHTML(user);
        })
        .then(function(userReturn) {
            //console.log(userReturn);
            fs.writeFile("index.html", userReturn, function(err){
                if(err) throw err;
                console.log("WOHOOO!")
            })
        
        })

        

            ///
            /////.then (another api call for stars. Search into github api).

         
            
            // })
          });

 }


// function writeToFile(fileName, data) {
 

  
// }


//  function company () {
//      if 
//  }

 init();
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
require("dotenv").config();

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
        choices: ['green', 'red', 'orange', 'yellow', 'blue']


    }
];

inquirer
    .prompt(questions)
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
        const newQueryUrl = `https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
    
        //  axios.get(queryUrl).then((res1) => {axios.get(newQueryUrl).then((res2.data) => {generateHTML(res) 

        axios.get(queryUrl).then(function(res1){
            console.log(res1.data);
        })

            ///
            /////.then (another api call for stars. Search into github api).

         
            // })
            // })
          });
    




// function writeToFile(fileName, data) {
 

  
// }

// function init() {



// }

// init();
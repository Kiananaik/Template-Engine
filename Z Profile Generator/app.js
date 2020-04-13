const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const placeholder = require("json-placeholder-replacer");


// const licenses = require("./licenses");

const util = require("util");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

var info = [];

inquirer
  .prompt([ {
    type: "list",
    name: "job",
    message: "Who is joining this team list?",
    choices: [
        "Manager",
        "Engineer",
        "Intern"
    ]
  }
]).then((res) =>  {

    switch (res.job) {
    
        case "Manager":
            return askManager(res);
        case "Engineer":
            return askEngineer(res);
        case "Intern":
            return askIntern(res);
        default:
            return;
    }
    //MAKE A SWITCH CASE STATEMENT
});

//Now write each aask function...

function askManager() {

    inquirer.prompt([ 
        {
            type: "list",
            name: "job",
            message: "Who is joining this team list?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {

        },
        {

        },
    ]).then(manager => {

        



    })


};





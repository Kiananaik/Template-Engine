const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//CONST REFERING TO HTML FILE TEMPLATES

const mgr = require("./lib/mgr");
const engr = require("./lib/engr");
const int = require("./lib/int");
const lead = require("./lib/lead");

async function genTeamPro(team) {
  inquirer.prompt([ {
    type: "input",
    name: "fileName",
    message: "What is the manager's name? \n(Invalid characters: \ / : * ? &quot; &lt; &gt; |) "
  },
  {
    type: "input",
    name: "id",
    message: "Manager's ID: "
  },
  {
    type: "input",
    name: "email",
    message: "Manager's email: "
  },
  {
    type: "input",
    name: "room",
    message: "Manager's office number: "
  }] ).then((details) => {
    const mgr = new mgrInfo(details.name, details.id, details.email, details.officeNumber);
    team.push(mgr);

  })





    const startHtml = `<!DOCTYPE html>
    <html lang="en-us">
    
    <head>
        <meta charset="UTC-8">
        </meta>
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/5bc96e206d.js" crossorigin="anonymous"></script>
    </head>
    
    <body>
        <div class="container">
            <div class="row">`
    fs.appendFile("./output/index.html", startHtml, (err) => {
        if (err) throw err
    })


    for (let member of team) {
        if (member.getRole() === "Manager") {
            const html = `<div class="col-md text-center">
            <div class="card">
                <div class="card-header">
                    <h5>${member.name}</h5>
                    <h5><i class="fab fa-black-tie"></i>Manager</h5>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${member.id}
                        </li>
                        <li class="list-group-item">Email: ${member.email}</li>
                        <li class="list-group-item">Office Number: ${member.officeNumber}</li>
                    </ul>
                </div>
            </div>
            </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })

        }
        else if (member.getRole() === "Engineer") {
            const html = `<div class="col-md text-center">
            <div class="card">
            <div class="card-header">
                <h5>${member.name}</h5>
                <h5><i class="fas fa-tools"></i>Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}
                    </li>
                    <li class="list-group-item">Email: ${member.email}</li>
                    <li class="list-group-item">Github: <a href=https://github.com/${member.github}>${member.github}</a></li>
                </ul>
            </div>
        </div>
        </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })

        }
        else if (member.getRole() === "Intern") {
            const html = `<div class="col-md text-center">
            <div class="card">
            <div class="card-header">
                <h5>${member.name}</h5>
                <h5><i class="fas fa-coffee"></i>Intern</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${member.id}
                    </li>
                    <li class="list-group-item">Email: ${member.email}</li>
                    <li class="list-group-item">School: ${member.school}</li>
                </ul>
            </div>
        </div>
        </div>`
            fs.appendFile("./output/index.html", html, (err) => {
                if (err) throw err;
            })
        }
    }
    const endHtml = `</div>
    </div>
    </div>
    </body>
    
    </html>`
    fs.appendFile("./output/index.html", endHtml, (err) => {
        if (err) throw err;
        console.log("Team profile generated. Check your output folder.")
    })
}

buildTeam();


//WILL REFER TO THESE INPUTS AS ANSWERS IN A LATER FUNCTION
inquirer
  .prompt([ {
    type: "input",
    name: "fileName",
    message: "What should this README file's name be? \n(Invalid characters: \ / : * ? &quot; &lt; &gt; |) \n(Example: typing in my name, Kiana, names the file KianaREADME.md)"
 
    //NEED TO REMEMBER TO LET USER CHANGE README FILE NAME
  },
  {
    type: "input",
    name: "user",
    message: "Enter your GitHub username: "
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?"
  },
  {
    type: "input",
    name: "desc",
    message: "Write a description of your project."
  },
  {
    type: "input",
    name: "install",
    message: "What are your project's installation requirements?"
  },
  {
    type: "input",
    name: "usage",
    message: "What is your project's usage type?"
  },
  {
    type: "input",
    name: "license",
    message: "What is your project's licensing?"
  },
  {
    type: "input",
    name: "contributors",
    message: "Who are your project's contributors?"
  },
  {
    type: "input",
    name: "tests",
    message: "Tests: "
  },
//USING THE .THEN FUNCTION TO 
]).then(function(details) {
  //GRAB THE USERNAME FROM GITHUBS API
  console.log(details.user);
  console.log(details.fileName);

  const fileName = details.fileName;
  const user = details.user;
  const queryUrl = `https://api.github.com/users/` + user;

  //AXIOS GOES HERE
  axios.get(queryUrl).then(function(res) {
    //CHECKING TO MAKE SURE THIS INFORMATION CAN BE SHOWN CORRECTLY
    
    // console.log(res.details.profile picture from git);
    // console.log(res.details.email);
    console.log(res.details.avatar_url);
    console.log(res.details.email);
    // console.log(res.details.user live web portfolio);
    // console.log(res.details.user description);

    // const pic = (res.details.avatar_url);
    // const email = res.details.email;
    const pic = "(" + res.details.avatar_url + ")";
    const email = res.details.email;
    // const portfolio = res.details.portfolio link;
    // const bio = res.details.user summary;




    //HOW DO I PUT THE BADGE IN??????
    // const badge = ![badge](https://img.shields.io/github/languages/top/${login}/${#});




    //NOW WE'LL PUT IT TOGETHER BY APPENDING USER INPUTS & API DATA
    fs.appendFile("ReadMe.md", "Title: " + details.title +
      "\n\n\nContents: " + "\n1.Description" + "\n2.Usage" + 
      "\n3.Installation" + "\n4.Author" + "\n5.License" + 
      "\n6.Tests" + "\n7.Contributions" +

      //TABLE OF CONTENTS ABOVE & newREADME.md USER INPUT BELOW

      "\n\n\n\nDescription:\n" + details.desc +
      "\n\nUsage:\n" + details.usage +
      "\n\nInstallation:\n" + details.install +

      //INFORMATION ABOUT THE GITHUB USER STARTS HERE

      "\n\nAuthor: " + details.user + "\n" +
      "![Chosen Github User's Profile Image]" + 
      //THE ABOVE CREATES ALT TEXT FOR THE GENERATING FILE 
      pic + "\n" + "Email Address: " + email + "\n" + 
      "Live Web Portfolio: " + portfolio + "\n" + 
      "Brief Biography: " + bio + 

      //GITHUB USER INFO ENDS HERE

      "\n\nLicense:\n" + details.license + 
      "\n\nTests:\n" + details.tests + 
      "\n\nContributions:\n" + details.contributors ,

      function(err) {
        if (err) throw err;
        console.log('Saved!');
      }
    );

    fs.rename('ReadMe.md', details.fileName + 'ReadMe.md', function (err) {
      if (err) throw err;
      console.log('File Renamed!');
    });

  });
});
  
    


//END OF SCRIPT
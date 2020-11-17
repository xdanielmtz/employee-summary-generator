
const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Develop/lib/htmlRenderer");
const { removeAllListeners } = require("process");
var responseInputName = '';
const theTeam = [];
// Function that starts app.
startPrompts();

function startPrompts(){
    inquirer.prompt([ 
        {
            type : "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "list",
            message: "What is your role in your team?",
            name: "role",
            choices: ["Intern", "Engineer", "Manager"]
        }
    ]).then(response => {
        // Depending on the user response, they will be presented with a different series of prompts. 
        if (response.role === "Intern"){
            responseInputName=response.name;
            return userIntern();
        }
        if(response.role === "Engineer"){
            responseInputName=response.name;
            return userEngineer ();
        }
        if (response.role === "Manager"){
            responseInputName=response.name;
            return userManager ();
        }
    })
}

// Definitions of different user roles' functions.
function userIntern (){
    inquirer.prompt([ 
        {
            type : "input",
            message: "What is your ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email?", 
            name: "email"
        },
        {
            type: "input",
            message: "What is your school?",
            name: "school"
        }
    ]).then(responseIntern => {
        const newIntern = new Intern(responseInputName, responseIntern.id, responseIntern.email, responseIntern.school)
        theTeam.push(newIntern);
        return repeat();
    })
};

function userEngineer () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your ID?",
            name: "id" 
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your Github username?",
            name: "github"
        }
    ]).then(responseEngineer => {
        const newEngineer = new Engineer(responseInputName, responseEngineer.id, responseEngineer.email, responseEngineer.github)
        theTeam.push(newEngineer);
        return repeat();
    })
};

function userManager (){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"
        }
    ]).then(responseManager => {
        const newManager = new Manager(responseInputName, responseManager.id, responseManager.email, responseManager.officeNumber)
        theTeam.push(newManager)
        return repeat();
    })
};

//=====================================================================

function repeat(){
    inquirer.prompt([
        {
            type:"confirm",
            message:"Would you like to input a team members data?",
            name:"data"
        }
    ]).then(response => {
        if(response.data === true){
            return startPrompts();
        }
        else if(response.data === false){
            console.log("Summary created!");
            fs.writeFile(outputPath, render(theTeam), "utf-8", err => {
                if (err) throw err

            })
        }
    })
};

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

//======================================================================
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
        if (response.role === "Intern"){
          return userIntern();
        }
        if(response.role === "Engineer"){
            return userEngineer ();
        }
        if (response.role === "Manager"){
            return userManager ();
        }
    })
}

//======================================================================

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
    ]).then(response => {
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
    ]).then(response => {
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
    ]).then(response => {
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
            return teamData();
        }
        else if(response.data === false){
            console.log("Summary created!");
        }
    })
};


function teamData (){
inquirer.prompt([
    {
        type: "list",
        message: "What is their role?",
        name: "teamRole",
        choices: ["Intern", "Engineer", "Manager"]
    },
]).then(response => {
    if(response.teamRole === "Intern"){
        inquirer.prompt([
            {
                type: "input",
                message: "What is their ID?",
                name:"id"
            },
            {
                type: "input",
                message: "What is their email?",
                name:"email"
            },
            {
                type: "input",
                message: "What is their school?",
                name:"school"
            },
        ]).then(response => {
            repeat();
        })
    }
    if(response.teamRole === "Engineer"){
        inquirer.prompt([
            {
                type: "input",
                message: "What is their ID?",
                name:"id"
            },
            {
                type: "input",
                message: "What is their email?",
                name:"email"
            },
            {
                type: "input",
                message: "What is their Github username?",
                name:"github"
            },
        ]).then(response => {
            repeat();
        })
    }
    if (response.teamRole === "Manager"){
        inquirer.prompt([
            {
                type: "input",
                message: "What is their ID?",
                name:"id"
            },
            {
                type: "input",
                message: "What is their email?",
                name:"email"
            },
            {
                type: "input",
                message: "What is their office number?",
                name:"officeNumber"
            },
        ]).then(response => {
            repeat();
        })
    }
})
}



















// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

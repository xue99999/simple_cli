const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

function copyMeetConfigJS() {
    figlet('syberos cli', function(err, data) {
        if (err) {
            console.log(chalk.red('Some thing about figlet is wrong!'))
        }
        console.log(chalk.yellow(data))
        let targetFilePath = path.resolve('syberos.config.js')
        let templatePath = path.join(__dirname,'../syberos/configjs/syberos.config.js');
        let contents = fs.readFileSync(templatePath,'utf8');
        fs.writeFileSync(targetFilePath,contents,'utf8');
        console.log(chalk.green('Initialize syberos config success \n'));
        process.exit(0);
    })
}


module.exports = function(){
    if (fs.existsSync(path.resolve('meet.config.js'))) {
        inquirer.prompt([
            {
                name: 'init-confirm',
                type: 'confirm',
                message: 'syberos.config.js already existed, are you sure to overwrite?',
                validate: input => {
                    if (input.lowerCase !== 'y' && input.lowerCase !== 'n') {
                        return 'Please input y/n !'
                    } else {
                        return true
                    }
                }
            }
        ])
            .then(answers => {
                if(answers['init-confirm']) {
                    copyMeetConfigJS()
                } else {
                    process.exit(0)
                }
            })
            .catch(err => {
                console.log(chalk.red(err))
            })
    } else {
        copyMeetConfigJS()
    }
}
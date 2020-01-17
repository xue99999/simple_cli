#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
const initial = require('../packages/commands/init');

program
    .version('1.0.0','-v, --version')
    .command('init')
    .description('initialize your meet config')
    .action(initial)


// 加上这行才可以生效哦
program.parse(process.argv);
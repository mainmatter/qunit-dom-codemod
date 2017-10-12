'use strict';

const fs = require('fs');

const defineTest = require('jscodeshift/dist/testUtils').defineTest;
const fixtureFolder = `${__dirname}/../__testfixtures__/qunit-dom-codemod`;

fs.readdirSync(fixtureFolder).filter(filename => (/\.input\.js$/).test(filename)).forEach(filename => {
  defineTest(__dirname, 'qunit-dom-codemod', {}, `qunit-dom-codemod/${filename.replace(/\.input\.js$/, '')}`);
});

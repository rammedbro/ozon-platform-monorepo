#!/usr/bin/env node
const path = require('path');
const consola = require('consola');

const pkg = require('./package.json');
const { Cli } = require(path.join(__dirname, pkg.main));

const cli = new Cli();
cli
  .run()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    consola.error(e.message);
    process.exit(1);
  });

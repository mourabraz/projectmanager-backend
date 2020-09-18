#! /usr/bin/env node

'use strict';

const { resolve } = require('path');
const { exec } = require('child_process');
const fsExtra = require('fs-extra');

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
});

const uploadFolder = resolve(__dirname, '..', 'tmp', 'upload');
const imagesFolder = resolve(__dirname, 'images');

if (args.help) {
  printHelp();
} else {
  console.log('reset the upload folder!');
  resetFilesAndPhotosFromUploadFolder();

  console.log('revert database');
  runComandToRevertDatabase();
}

// ************************************
function printHelp() {
  console.log('script usage:');
  console.log('  script.js --help');
  console.log('');
  console.log('    --help                   print this help');
  console.log('');
}

function resetFilesAndPhotosFromUploadFolder() {
  console.log('    - erase the folder');
  fsExtra.emptyDirSync(uploadFolder);

  console.log('    - copy new files to folder');
  fsExtra.copySync(imagesFolder, uploadFolder);
}

function runComandToRevertDatabase() {
  exec('cd .. && yarn typeorm:gm migration:revert', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.error(err);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    exec('cd .. && yarn typeorm:gm migration:run', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.error(err);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      exec('cd .. && yarn seedprod', (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.error(err);
          return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    });
  });
}

const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);

const url = args[0];
const filePath = args[1];

const fetcher = function(url, filePath) {
  
  request(url, (err, res, body) => {
    if (err) {
      console.log('There was an error: ', err);
      return;
    }

    fs.writeFile(filePath, body, err => {
      fs.stat(filePath, (err, stats) => {

        const fileSize = stats.size;

        if (err) {
          console.log('There was an error: ', err);
        } else {
          console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
        }

      });
    });

  });
};

fetcher(url, filePath);
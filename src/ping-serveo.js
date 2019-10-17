const request = require('request');
const { exec } = require('child_process');

const link = 'http://placeo.serveo.net/';
const command = 'ssh -o ServerAliveInterval=30 -R 80:localhost:8000 serveo.net >> log.txt';

const ping = (link, failCallback) => {
  exec(`echo "${Date()}" >> log.txt`);
  request(link, function(error, response, body) {
    console.log('status ' + response.statusCode);
    if (error) {
      console.log('Err: ' + error);
      return false;
    }

    if (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 202) {
      console.log(link + ' is up!!');
      return false;
    }

    if (response.statusCode == 301 || response.statusCode == 302) {
      console.log(link + ' is redirecting us!!');
      return false;
    }

    if (response.statusCode == 401) {
      console.log('you are unauthorized to ' + link);
      return false;
    }

    if (response.statusCode == 502) {
      console.log(link + ' is down. Restarting.');
      failCallback();
      return false;
    } else {
      console.log(link + ' is down!! Restarting.');
      failCallback();
    }
  });
};

const failCallback = () => {
  console.log("failCallback running");
  exec(command, (err, stdout, stderr) => {

    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    console.log("failCallback ran");
  });
};

ping(link, failCallback);
setInterval(() => {
  ping(link, failCallback);
}, 30000);
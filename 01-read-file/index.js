const fs = require('fs');
const path = require('path');
const { stdout } = process;

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';
stream.on('data', (chunk) => (data += chunk));
stream.on('end', () => stdout.write(data));
stream.on('error', (error) => console.log('Error', error.message));

// fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

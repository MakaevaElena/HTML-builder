const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';
readStream.on('data', (chunk) => (data += chunk));
readStream.on('end', () => stdout.write(data));
readStream.on('error', (error) => console.log('Error', error.message));

// fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

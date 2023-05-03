const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const { stdin, stdout } = process;
stdout.write('Привет! Напиши что-нибудь\n');

stdin.on('data', (data) => {
  if (data.toString().match('exit')) {
    stdout.write('Buy -buy!');
    process.exit();
  }

  output.write(data);
  process.on('SIGINT', () => {
    // stdout.write('\n');
    stdout.write('Ваш текст записан в файл text.txt\n');
    process.exit();
  });
});

// process.on('exit', () => stdout.write('Buy -buy!'));

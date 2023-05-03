const fs = require('fs');
const path = require('path');

const copyDir = () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err; // не удалось создать папку
    console.log(`Папка files-copy успешно создана`);
  });

  fs.readdir(path.join(__dirname, 'files'), (_, files) => {
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        (err) => {
          if (err) throw err; // не удалось скопировать файл
          console.log(`Файл ${file} успешно скопирован`);
        },
      );
    });
  });
};

copyDir();

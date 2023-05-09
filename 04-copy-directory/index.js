const fs = require('fs');
const path = require('path');

const copy = () => {
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

const copyDir = () => {
  fs.stat(path.join(__dirname, 'files-copy'), function (err) {
    if (!err) {
      console.log('Папка files-copy есть');
      fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) throw err; // не удалось удалить папку
        console.log('Папка files-copy успешно удалена');
        copy();
      });
    } else {
      copy();
    }
  });
};

copyDir();

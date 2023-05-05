// 1. Импорт всех требуемых модулей
const path = require('path');
const fs = require('fs');

const regExp = /{{\w*}}/g;

// path.resolve()

// Создана папка 'project-dist'
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err; // не удалось создать папку
  console.log(`Папка project-dist успешно создана`);
});

// 2. Прочтение и сохранение в переменной файла-шаблона
const templateReadStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let template = '';
templateReadStream.on('data', (chunk) => {
  template += chunk;
});
templateReadStream.on('error', (error) => console.log('Error', error.message));

// 3. Нахождение всех имён тегов в файле шаблона
let tegArr;
templateReadStream.on('end', () => {
  tegArr = template
    .toString()
    .match(regExp)
    .map((e) => e.replace(/{{/, '').replace(/}}/, ''));
  // console.log(tegArr);

  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (_, files) => {
    files.forEach((file) => {
      const readStream = fs.createReadStream(
        path.join(__dirname, 'components', file.name),
        'utf-8',
      );

      // 5. Запись изменённого шаблона в файл **index.html** в папке **project-dist**
      const writeStream = fs.createWriteStream(
        path.join(__dirname, 'project-dist', 'index.html'),
        'utf-8',
      );

      // 4. Замена шаблонных тегов содержимым файлов-компонентов
      readStream.on('data', (chunk) => {
        const obj = {};
        obj[file.name] = chunk;
        const tag = file.name.split('.')[0];
        template = template.replace(new RegExp(`{{${tag}}}`), obj[file.name]);

        console.log(tag);
        writeStream.write(template);
      });

      readStream.on('error', (error) => console.log('Error', error.message));
      readStream.on('end', () => {
        // console.log('end');
      });
    });
  });
});

// 6. Использовать скрипт написанный в задании **05-merge-styles** для создания файла **style.css**

// Чтение содержимого папки **styles**
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (_, files) => {
  //  Проверка является ли объект файлом
  const trueFiles = files.filter((file) => file.isFile());
  // и имеет ли файл нужное расширение
  const cssFiles = trueFiles.filter((file) => file.name.split('.')[1] === 'css');

  const writeStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'style.css'),
    'utf-8',
  );

  cssFiles.forEach((file) => {
    // Чтение файла стилей
    const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');

    // Запись массива стилей в файл **bundle.css**
    readStream.on('data', (chunk) => writeStream.write(chunk));
    readStream.on('error', (error) => console.log('Error', error.message));
    readStream.on('end', () => console.log('end'));
  });
});

// 7. Использовать скрипт из задания **04-copy-directory** для переноса папки **assets** в папку project-dist
const from = path.join(__dirname, 'assets');
const to = path.join(__dirname, 'project-dist', 'assets');

const copyDir = (fromPath, toPath) => {
  fs.mkdir(toPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Папка успешно создана`);
  });

  fs.readdir(fromPath, { withFileTypes: true }, (_, files) => {
    files.forEach((file) => {
      let fromPathChild = path.join(fromPath, file.name);
      let toPathChild = path.join(toPath, file.name);

      fs.stat(fromPathChild, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          copyDir(fromPathChild, toPathChild);
        }
        if (stats.isFile()) {
          fs.copyFile(fromPathChild, toPathChild, (err) => {
            if (err) throw err;
            console.log(`Файл успешно скопирован`);
          });
          // fs.createReadStream(fromPathChild).pipe(fs.createWriteStream(toPathChild));
        }
      });
    });
  });
};

copyDir(from, to);

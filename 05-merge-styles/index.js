// 1. Импорт всех требуемых модулей
const path = require('path');
const fs = require('fs');

// 3. Чтение содержимого папки **styles**
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (_, files) => {
  // 4. Проверка является ли объект файлом
  const trueFiles = files.filter((file) => file.isFile());
  // и имеет ли файл нужное расширение
  const cssFiles = trueFiles.filter((file) => file.name.split('.')[1] === 'css');

  // Создана папка 'project-dist'
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err; // не удалось создать папку
    console.log(`Папка project-dist успешно создана`);
  });

  const writeStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    'utf-8',
  );

  cssFiles.forEach((file) => {
    // 4. Чтение файла стилей
    const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');

    // 6. Запись массива стилей в файл **bundle.css**
    readStream.on('data', (chunk) => writeStream.write(chunk));
    readStream.on('error', (error) => console.log('Error', error.message));
    readStream.on('end', () => console.log('end'));
  });
});

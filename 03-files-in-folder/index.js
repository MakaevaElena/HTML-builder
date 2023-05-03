const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirpath = path.join(__dirname, 'secret-folder');

fs.readdir(dirpath, { withFileTypes: true }, (error1, filenames) => {
  if (error1) {
    cb(error1);
    return;
  }

  const trueFiles = filenames.filter((file) => file.isFile());
  // const filepaths = trueFiles.map((name) => path.join(dirpath, name.name));

  trueFiles.map((file) => {
    const name = file.name.split('.')[0];
    const extent = file.name.split('.')[1];
    fs.stat(path.join(dirpath, file.name), (err, stats) =>
      console.log(name, '-', extent, '-', stats.size / 1000, 'kb'),
    );
  });
});

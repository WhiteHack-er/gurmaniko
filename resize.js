const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/images/food');

// Рекурсивный обход
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

// Запуск
walk(targetDir, file => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.webp') {
    const temp = file + '.tmp';

    sharp(file)
      .resize({ width: 800 })
      .toFile(temp)
      .then(() => {
        fs.renameSync(temp, file);
        console.log(`✅ Сжат: ${file}`);
      })
      .catch(err => {
        console.error(`❌ Ошибка с ${file}:`, err.message);
      });
  }
});

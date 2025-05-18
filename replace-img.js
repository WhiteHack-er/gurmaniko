const fs = require('fs');
const path = require('path');

const directory = './src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Заменяем расширения на .webp
  content = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');

  // Добавляем loading="lazy" в img теги (если его нет)
  content = content.replace(/<img(?![^>]*loading=)[^>]*?>/gi, match => {
    return match.replace('<img', '<img loading="lazy"');
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Обработан файл: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (path.extname(fullPath) === '.html') {
      replaceInFile(fullPath);
    }
  });
}

walk(directory);

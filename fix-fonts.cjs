const fs = require('fs');
let code = fs.readFileSync('generate-textures.mjs', 'utf8');

// Replace sans-serif with Arial
code = code.replace(/sans-serif/g, 'Arial');

// Replace serif with Times New Roman
code = code.replace(/'serif'/gi, "'Times New Roman'");
code = code.replace(/ serif/gi, ' Times New Roman');
code = code.replace(/"serif"/gi, '"Times New Roman"');
code = code.replace(/, serif/gi, ', Times New Roman');

fs.writeFileSync('generate-textures.mjs', code);
console.log('Fonts updated');

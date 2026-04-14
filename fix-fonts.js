const fs = require('fs');
let code = fs.readFileSync('generate-textures.mjs', 'utf8');

// Replace sans-serif with Arial
code = code.replace(/sans-serif/g, 'Arial');

// Replace serif (which is not preceeded by sans-) with Times New Roman
// To be safe, we can just replace 'serif' with 'Times New Roman'
// wait, sans-serif has 'serif' in it.
// If we replaced sans-serif first to Arial, 'serif' won't match the 'serif' in 'sans-serif' anymore, except if there are none.
code = code.replace(/'sans-serif'/g, "'Arial'");
code = code.replace(/'serif'/g, "'Times New Roman'");
code = code.replace(/"sans-serif"/g, "'Arial'");
code = code.replace(/"serif"/g, "'Times New Roman'");

// Actually, in the file the code is like: ctx.font = '14px sans-serif'
code = code.replace(/sans-serif/gi, 'Arial');
code = code.replace(/serif/gi, 'Times New Roman');

fs.writeFileSync('generate-textures.mjs', code);
console.log('Fonts updated');

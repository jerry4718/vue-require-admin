const path = require('path');
const fs = require('fs');
const mkdirSync = require('../mkdir');

const srcPath = path.join(__dirname, '../../src');

const pagePath = path.join(srcPath, 'pages');

const pages = process.argv.slice(2);

pages.forEach(dir => {
    const fileName = dir.split(/\//g).pop();

    console.log(fileName);
    const fileDir = path.join(pagePath, dir);

    console.log(fileDir);

    mkdirSync(fileDir);

    const jsFilePath = path.join(fileDir, `${fileName}.component.js`);
    const htmlFilePath = path.join(fileDir, `${fileName}.html`);
    const cssFilePath = path.join(fileDir, `${fileName}.css`);

    // 兼容windows的路径
    const htmlFileRelative = path.relative(srcPath, htmlFilePath).replace(/\\/g, '\/');
    const cssFileRelative = path.relative(srcPath, cssFilePath).replace(/\\/g, '\/');

    console.log(cssFileRelative, htmlFileRelative);

    fs.writeFileSync(jsFilePath, `
define([
    'text!${htmlFileRelative}',
    /*'css!${cssFileRelative}',*/
], function (
    template
) {
    return {
        template: template,
    };
});
        `.trim());

    fs.writeFileSync(htmlFilePath, `
<div>this page is ${dir}</div>
        `.trim());

    fs.writeFileSync(cssFilePath, `
        `.trim());

});
console.log();

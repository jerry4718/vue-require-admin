const path = require('path');
const fs = require('fs');
const mkdirSync = require('../mkdir');

const srcPath = path.join(__dirname, '../../src');

const args = process.argv.slice(2);

console.log(args);

const params = args.filter(a => a.indexOf('=') > -1)
    .reduce((m, p) => {
        let [k, v] = p.split('=', 2);
        m[k] = v;
        return m;
    }, {});

const pagePath = path.join(srcPath, params.path || 'pages');

args.filter(a => a.indexOf('=') < 0)
    .forEach(dir => {
        const fileName = dir.split(/\//g).pop();

        const fileDir = path.join(pagePath, dir);

        mkdirSync(fileDir);

        const jsFilePath = path.join(fileDir, `${fileName}.component.js`);
        const htmlFilePath = path.join(fileDir, `${fileName}.html`);
        const cssFilePath = path.join(fileDir, `${fileName}.css`);

        // 兼容windows的路径
        const jsFileRelative = path.relative(srcPath, jsFilePath).replace(/\\/g, '\/');
        const htmlFileRelative = path.relative(srcPath, htmlFilePath).replace(/\\/g, '\/');
        const cssFileRelative = path.relative(srcPath, cssFilePath).replace(/\\/g, '\/');

        console.log({
            path: fileDir,
            name: fileName,
            js: jsFileRelative,
            css: cssFileRelative,
            html: htmlFileRelative,
        });

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

const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');

const url: string = 'https://www.amboss.com/de/wissen/index';


got(url).then(response => {
    const $ = cheerio.load(response.body);
    //console.log($.html())

    const txt = [];
    $('li', '.amboss-panel').each(function(i, elem): void {
        txt[i] = $(this).text();
        });
    //console.log(txt);
    //console.log(txt.length);

    const href = [];
    $('a', '.amboss-panel').each((i, link) => {
        href[i] = link.attribs.href;
        });
    //console.log(href);
    //console.log(href.length);

    var list = [];
    for (let j = 0; j < txt.length; j++) {
        list[j] = {
            'name': txt[j],
            'url': 'https://www.amboss.com' + href[j]
        }
    }
    //console.log(list);

    const data = JSON.stringify(list, null, 2)
    fs.writeFile('.\\json-products\\dataFromAmboss.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log(`JSON data "dataFromAmboss.json" is saved. It contains ${list.length} elements.`);
});
}).catch(err => {
console.log(err);
});


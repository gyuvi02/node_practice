const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate =  require('./modules/replaceTemplate');


// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `Az elobb beolvasott szoveg a kovetkezo: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return  console.log('Error happened!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('The file has been written');
//             })
//         });
//         });
//     });


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true,}));
console.log(slugs);


const server = http.createServer((req, resp) => {
    const {query, pathname} = url.parse(req.url, true);

//Overview page
    if (pathname === '/overview' || pathname === '/') {
        resp.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT-CARDS%}', cardsHtml);
        resp.end(output);

//Product page
    }else if (pathname === '/product') {
        const product = dataObj[query.id];

        resp.writeHead(200, {
            'Content-type': 'text/html'
        });

        const output = replaceTemplate(tempProduct, product);

        resp.end(output);

//API
    }else if (pathname === "/api") {
        resp.writeHead(200, {
            'Content-type': 'application/json'
        });
        resp.end(data);

//Not found
    }else {
        resp.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        resp.end('<h1>Page not found</h1>');
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listeneng to requests on port 8000')
});
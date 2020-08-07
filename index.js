const fs = require('fs');
const http = require('http');
const url = require('url');


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

const server = http.createServer((req, resp) => {
    const pathName = req.url;

//Overview page
    if (pathName === '/overview' || pathName === '/') {
        resp.writeHead(200, {
            'Content-type': 'text/html'
        });
        resp.end(tempOverview);

//Product page
    }else if (pathName === '/product') {
         resp.end('This is the product');

//API
    }else if (pathName === "/api") {
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
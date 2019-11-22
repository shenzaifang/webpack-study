/**
 *
 * Created by shenzaifang on 2019-11-21
 */
const fs = require('fs');
const path = require('path');
if(typeof window === 'undefined'){
    global.window = {};
}
const express = require('express');
const {renderToString} = require('react-dom/server');

const SSR = require("../dist/search-server");
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'),'utf-8');
const data = require('./data.json');


const server = (port) => {
    const app = express();

    app.use(express.static('dist'));
    app.get('/', (req, res) => {
        const html = renderMarkUp(renderToString(SSR));
        res.status(200).send(html);
    });
    app.get('/search', (req, res) => {
        const html = renderMarkUp(renderToString(SSR));
        res.status(200).send(html);
    });
    app.listen(port, () => {
        console.log('Server is running on port:', port);
    })
};

server(process.env.PORT || 3000);

const renderMarkUp = (str) => {
    let dataStr = JSON.stringify(data);
    return template.replace('<!--html-placeholder-->', str)
        .replace('<!--INITIAL-DATA-placeholder-->',`<script>window.__initial = ${dataStr}</script>`);
};

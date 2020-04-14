const Vue = require('vue');
const fs = require('fs');
const server = require('express')();
const path = require('path');
const {createRenderer} = require('vue-server-renderer');
const createApp = require('./app');


const indexTemplate = path.resolve(__dirname, './index.template.html');
console.log(indexTemplate);
const renderer = createRenderer({
    template: fs.readFileSync(indexTemplate, 'utf-8')
});

server.get('*', (req, res) => {
    const context = {
        title: 'hello',
        url: req.url,
        meta: `
            <meta charset="utf8" />
          `
    };
    const app = createApp(context);

    renderer.renderToString(app, context, (err, html) => {
        console.log(html); // will be the full page with app content injected.
        res.end(html);
    });

    // renderer.renderToString(app, (err, html) => {
    //     console.log('renderToString');
    //     if (err) {
    //         res.status(500).end('Internal Server Error');
    //         return;
    //     }
    //     // console.log('html=>>>>>>>>>>>', html);
    //     res.end(html);
    // });
});

server.listen(8080);
const http = require('http')

/*
const server = http.createServer((req, res) => {
    //console.log(req);
    console.log(`url : ${req.url}`);
    console.log(`method : ${req.method}`);
    console.log(`headers :`, req.headers);
    //process.exit() -> programi bitiriyor
})
*/

const server = http.createServer((req, res) => {
    console.log(`url : ${req.url}`);
    console.log(`method : ${req.method}`);
    console.log(`headers :`, req.headers);
    //res.write('<h1>begining: Hello World</h1>')
    //res.end()

    if (req.url === '/') {
        res.write('<h1>merhaba burasi index</h1>')
        res.end()
    } else if (req.url === '/hakkimizda') {
        res.write('<h1>merhaba burasi hakkimizda sayfasi</h1>')
        res.end()
    }


})


server.listen(3000)
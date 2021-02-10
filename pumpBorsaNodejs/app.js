const readline = require("readline");
const Binance = require('node-binance-api');


const binance = new Binance().options({
    APIKEY: '<binanceApiKey>',
    APISECRET: '<binanceSecret>'
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Coini gir ", async function(name) {

    kriptoAlVeEmirVer(name)

});

async function kriptoAlVeEmirVer(kriptoAdi) {

    let kriptoAdiWithUSDT = kriptoAdi + "BTC"

    let param = 0.00061730 //bitcoin miktari

    let ticker = await binance.prices();
    let guncelFiyat = parseFloat(ticker[kriptoAdiWithUSDT])
    console.log(kriptoAdi + " nin şuanki fiyati: " + guncelFiyat)
    console.log("benim butcem : " + param)

    let alinanMiktar = parseInt(parseFloat(param / guncelFiyat).toFixed(3))
    alinanMiktar = alinanMiktar - (alinanMiktar * 2) / 100 - 1
    alinanMiktar = Math.floor(alinanMiktar)

    console.log("alinan miktar: " + alinanMiktar)

    binance.marketBuy(kriptoAdiWithUSDT, alinanMiktar).then(async() => {
            console.log("aldi")

            let satilacakFiyat = guncelFiyat + (guncelFiyat * 50) / 100

            console.log("satilacak fiyat : " + satilacakFiyat)

            await binance.sell(kriptoAdiWithUSDT, alinanMiktar, guncelFiyat * 2);

        })
        .catch(err => {

            console.log(err.body)

        });

}
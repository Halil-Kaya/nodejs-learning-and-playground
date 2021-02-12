const https = require('https')

//istekte bulunuyorum
https.get('https://restcountries.eu/rest/v2/name/turkey', (response) => {


    //burda datayi teker teker almaya calisiyor tek seferde almiyor
    let data = ''
    response.on('data', chunk => {
        console.log(chunk);
        data += chunk
    })

    //data alimi bittikten sonra bu fonksiyon tetikleniyor
    response.on('end', () => {
        const jsonData = JSON.parse(data)
        console.log(jsonData);
    })


}).on('error', err => {
    console.log('hata : ' + err);
})
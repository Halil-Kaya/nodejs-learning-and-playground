const axios = require('axios')

axios.get('https://restcountries.eu/rest/v2/name/turkey')
    .then((r) => {
        console.log(r.data[0]);
    })
import axios from 'axios';

export default class Ogrenci {
    constructor(ad) {
        this.ad = ad
    }

    async adiniSoyle() {
        console.log(`onun adi : ${this.ad}`)
        await axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(r => {
                console.log(r)
            })
    }
}
import axios from 'axios';

export default class Ogrenci {
    constructor(ad) {
        this.ad = ad
    }

    adiniSoyle() {
        console.log(`onun adi : ${this.ad}`)
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(r => {
                console.log(r)
            })
    }
}
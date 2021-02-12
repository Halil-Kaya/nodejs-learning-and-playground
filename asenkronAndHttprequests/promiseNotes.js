/*#####################################################################################*/
const promiseBasarili = Promise.resolve('islem basarili')

const promiseHata = Promise.reject(new Error('hata oldu'))

promiseBasarili
    .then((r) => console.log(r))

promiseHata
    .then((r) => console.log(r))
    .catch((err) => console.log(err))

/*#####################################################################################*/

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1 islemi 5 saniye surdu')
    }, 5000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 islemi 3 saniye surdu')
    }, 3000)
})

//butun hepsini calistirip cevaplarini icine atar
const promiseAll = Promise.all([p1, p2])

promiseAll
    .then((r) => console.log(r))
    //cikti(cikti bir array);
    //['p1 islemi 5 saniye surdu','p2 islemi 3 saniye surdu']

/*#####################################################################################*/

const promiseRace = Promise.race([p1, p2])
    //ilk gelen islemi alir sadece yani bir nevi yaristiriyor!
promiseRace
    .then((r) => console.log(r))
    //cikti
    //'p2 islemi 3 saniye surdu'
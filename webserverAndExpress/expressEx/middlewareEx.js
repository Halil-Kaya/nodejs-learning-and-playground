const express = require('express')
const app = express()

function m1(req, res, next) {
    console.log('m1 deyim');
    //next in anlami sonraki middle ware gec demek burda res.send() diyerek islemi kesip response donebilirim
    next()
}

function m2(req, res, next) {
    console.log('m2 deyim');
    next()
}

//herhangi bir istekte bu middleware lere girecek once m1 e sonra m2 ye sonra anonim functiona girecek ve bu her istekte olacak
app.use(m1);
app.use(m2);
app.use((req, res) => {
    console.log('butun isteklerde burasi calisacak');
})

//#######################################################################################
/*
simdi burasi cok efsane buraya hayran kaldim
*/
//burasi butun isteklerde caliscak bunu filtreleyebilirim
app.use((req, res) => {
    res.send('butun isteklerde buraya girecek');

})

// (/)'a yapilan butun isteklerde buraya girsin diye bir filtreleme yaptim dahasını da yapabilirim
app.use('/', (req, res) => {
    res.send('/ a yapilan butun isteklerde buraya girecek');
})

// (/)'a yapilan butun GET isteklerinde buraya girsin diye filtreledim simdi de 
//cok mukemmel bir sey bu!
app.get('/', (req, res) => {
    res.send('/ a yapilan butun GET isteklerde buraya girecek');
})

//aslinda butun istekler bir middleware gibi birsey
//#######################################################################################




app.listen(3000, () => {

    console.log('3000 port dinleniyor');

})
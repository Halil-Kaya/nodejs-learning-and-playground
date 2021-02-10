const fs = require('fs')
const chalk = require('chalk')


const ekle = (isim, telNo) => {

    const kisiler = dosyadanKisileriOku()

    const ayniAdaSahipKisilerArr = kisiler.filter((kisi) => {
        return kisi.isim == isim
    })

    if (ayniAdaSahipKisilerArr.length === 0) {
        kisiler.push({
            isim: isim,
            tel: telNo
        })
        dosyayaKisileriYaz(kisiler)
    } else {

        console.log(chalk.red.inverse(`${isim} isimli kisi zaten var!`))

    }

}

const dosyadanKisileriOku = () => {
    try {
        const dataBuffer = fs.readFileSync('kisiler.json');
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (e) {
        return []
    }
}

const dosyayaKisileriYaz = (kisilerArray) => {
    const jsonData = JSON.stringify(kisilerArray)
    fs.writeFileSync('kisiler.json', jsonData)

}

const sil = (isim) => {

    const kisiler = dosyadanKisileriOku()

    const dosyayaYazilacakKisiler = kisiler.filter((kisi) => {
        return kisi.isim !== isim
    })

    if (kisiler.length > dosyayaYazilacakKisiler.length) {
        console.log(chalk.green.inverse(isim + ' isimli kisi bulundu ve silindi'))
        dosyayaKisileriYaz(dosyayaYazilacakKisiler)
    } else {
        console.log(chalk.red.inverse(isim + ' isimli bir kisi yok!'))
    }

}

const listele = () => {

    const kisiler = dosyadanKisileriOku()

    kisiler.forEach((kisi) => {

        console.log(`adi: ${kisi.isim} tel: ${kisi.tel}`)

    })


}

const goster = (isim) => {

    const kisiler = dosyadanKisileriOku()

    const kisi = kisiler.find((kisi) => kisi.isim == isim)


    if (kisi != null) {
        console.log(chalk.yellow.inverse(`isim:  ${kisi.isim} tel: ${kisi.tel}`))
    } else {
        console.log('boyle bir kisi yok!')
    }

}



/*
exports.kisiEkle = ekle
exports.kisiSil = sil
exports.kisiListele = listele
exports.kisiGoster = goster
*/
module.exports = {
    kisiEkle: ekle,
    kisiSil: sil,
    kisiListele: listele,
    kisiGoster: goster
}
const yargs = require('yargs')
const kisi = require('./kisi')

yargs.version('1.5.3')

yargs.command({
    command: 'ekle',
    describe: 'yeni kisi eklemeye yarar',
    builder: {
        isim: {
            describe: 'eklenecek kisi adi',
            demandOption: true,
            type: 'string'
        },
        tel: {
            describe: 'eklenecek kisinin telefon numarasi',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        kisi.kisiEkle(argv.isim, argv.tel)
    }
})

yargs.command({
    command: 'sil',
    describe: 'kisi silmeye yarar',
    builder: {
        isim: {
            describe: 'silinecek kisi adi',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        kisi.kisiSil(argv.isim)
    }
})

yargs.command({
    command: 'goster',
    describe: 'kisiyi gosterir',
    builder: {
        isim: {
            describe: 'listelenecek kisi adi',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        kisi.kisiGoster(argv.isim)
    }
})

yargs.command({
    command: 'listele',
    describe: 'tum rehberi listeler',
    handler(argv) {
        kisi.kisiListele()
    }
})

//yargsin duzgun calismasi icin en son bu fonksiyonu cagirmalisin!
yargs.parse()
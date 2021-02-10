const os = require('os')
const fs = require('fs');

const readOs = () => {

    let str = ""
    str += "cpu sayisi: " + os.cpus().length + "\n"
    str += "bos hafiza: " + os.freemem() + "\n"
    str += "toplam rem: " + os.totalmem() + "\n"
    str += "kullanilan : " + (os.totalmem() - os.freemem()) + "\n"

    fs.writeFile('pc_info.txt', str, (err) => {
        if (err) console.log(err)
    })


}

exports.readOs = readOs
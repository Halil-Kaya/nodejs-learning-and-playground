const isaretler = ['*', '-', '/', '+']

function calculateText(message) {

    let arr = TextToArray(message)

    while (arr.length > 1) {

        if (arr[1] == '*') {
            arr[2] = arr[0] * arr[2]
            arr.shift()
            arr.shift()
            continue
        }

        if (arr[1] == '/') {
            arr[2] = arr[0] / arr[2]
            arr.shift()
            arr.shift()
            continue
        }

        arr[1] = arr[0] + arr[1]
        arr.shift()
    }

    return arr[0]
}

function TextToArray(message) {
    let index = 0
    let arr = []
    let isNumberContinue = false
    message.split('').forEach(item => {
        if (!isNaN(item)) {
            if (isNumberContinue) {
                arr[index - 1].push(item)
            } else {
                isNumberContinue = true
                if (arr[index] == undefined) {
                    arr[index] = []
                }
                arr[index].push(item)
                index++
            }
        }
        if (isaretler.includes(item)) {
            arr[index] = [item]
            isNumberContinue = false
            index++
        }
    })
    return cleanPollution(arr.map(item => item.join('')))
}

function cleanPollution(arr) {

    //bu temizleme islemini temizleyecek bir sey kalmayana kadar yapiyorum
    let isFinish = false
    while (!isFinish) {
        isFinish = true

        //tekralayan islem isaretlerinden kurtuluyorum
        arr = clearReplace(arr)
            //- den veya + dan sonraki çarpıyı veya bölmeyi temizliyorum yani ==> -* -> -    || +* -> + 
        for (let i = 0; i < arr.length + 1; i++) {
            if ((arr[i] == '+' || arr[i] == '-') && (arr[i + 1] == '*' || arr[i + 1] == '/')) {
                arr[i + 1] = ''
                isFinish = false
            }
        }
        arr = clearArray(arr)
        arr = clearReplace(arr)

        //* dan sonra gelen / yi veya / dan sonra gelen * yı temizliyorum
        //-+ kısmını - olarak degistiriyorum 
        //+- kısmında + yı siliyorum
        for (let i = 0; i < arr.length + 1; i++) {
            if ((arr[i] == '+' && arr[i + 1] == '-')) {
                arr[i] = ''
                isFinish = false
            } else if ((arr[i] == '-' && arr[i + 1] == '+')) {
                arr[i + 1] = ''
                isFinish = false
            }
            if ((arr[i] == '*' && arr[i + 1] == '/')) {
                arr[i + 1] = ''
                isFinish = false
            } else if ((arr[i] == '/' && arr[i + 1] == '*')) {
                arr[i + 1] = ''
                isFinish = false
            }
        }

        arr = clearArray(arr)

    }

    //sondaki işaretleri temizliyorum
    while (isNaN(arr[arr.length - 1])) {
        arr.pop()
    }

    while (isNaN(arr[0])) {

        if (arr[0] == '-' && !isNaN(arr[1])) {
            break
        }

        arr.shift()
    }



    return textToNumber(arr)
}

function textToNumber(arr) {

    // arrayde '+',3,'-',7 olan sekli 3,-7 şekline dönüştürüyorum
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == '+' || arr[i] == '-') {
            arr[i + 1] = parseInt(arr[i] + arr[i + 1])
            arr[i] = ''
        }
        if (!isNaN(arr[i]) && arr[i] != '') {
            arr[i] = parseInt(arr[i])
        }
    }
    arr = clearArray(arr)
    return arr
}


function clearArray(arr) {
    return arr.filter(item => {
        if (item != '') {
            return true
        }
    })
}

function clearReplace(arr) {
    return arr.filter((item, index) => {
        if (!isaretler.includes(item) || arr[index + 1] != item) return true
        return false
    })
}

module.exports.calculateText = calculateText
const t = async() => {

    const res = await test()


    console.log(res)

    console.log('ggg')
}

t()
t()
t()

function test() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('myDatAmy')
        }, 1000)

    })
}
const hataYakalayici = (err, req, res, next) => {
    /* 
        if (err.name === 'CastError') {
            res.json({
                message: err.message
            })
        } else {
            res.status(err.hataKodu).json({
                message: err.message,
                hataKodu: err.hataKodu
            })
        }
    */

    if (err.code === 11000) {

        return res.json({
            message: JSON.stringify(err.keyValue) + ' unique olmalıdır',
            hataKodu: 400
        })

    } else if (err.code === 66) {

        return res.json({
            message: 'Degistirilemez bir alani guncellemeye calistiniz',
            hataKodu: 400
        })

    } else {

        return res.statusCode(err.statusCode || 400)
            .json({
                hataKodu: err.statusCode || 400,
                message: err.message
            })

    }




    next()
}


module.exports = hataYakalayici
const catchErrors = (err, req, res, next) => {

    if (err.code === 11000) {

        return res.json({
            message: Object.keys(err.keyValue) + " icin girdiginiz " + Object.values(err.keyValue) + ' unique olmalıdır',
            hataKodu: 400
        })

    } else if (err.code === 66) {

        return res.json({
            message: 'Degistirilemez bir alani guncellemeye calistiniz',
            hataKodu: 400
        })

    } else {

        return res.status(err.statusCode || 400)
            .json({
                hataKodu: err.statusCode || 400,
                message: err.message
            })

    }


    next()

}

module.exports = catchErrors
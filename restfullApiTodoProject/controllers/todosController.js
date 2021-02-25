const User = require('../models/userModel')

/*
Bu istekleri sadece admin yapabilir o yuzden auth ve admin middleware lerinden gecmesi lazim
*/

const getAllTodos = async(req, res, next) => {

    try {

        //butun todolari userlarla birlikte getiriyor
        if (req.query.w == 'u') {
            const allTodosWithUsers = await User.getAllUsersWithTodos()

            return res.json(allTodosWithUsers)
        }

        //sadece todolari getiriyor
        const allTodos = await User.getAllTodos()

        return res.json(allTodos)

    } catch (err) {
        next(err)
    }

}


module.exports = {
    getAllTodos
}
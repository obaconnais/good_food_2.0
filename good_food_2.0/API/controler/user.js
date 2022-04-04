const User = require("../model/user")

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: `Database error`, error: err }))
}
exports.createUser = async (req, res) => {
    try {
        const { lastname, forname, mail, address } = req.body

        //testing if needed informations about user are not null
        if (!lastname || !forname || !mail || !address) {
            return res.status(400).json({ message: `at least on field are missing` })
        }

        const existingUser = await User.findOne({ mail: mail })

        //testing if user not exist
        if (existingUser) {
            return res.status(409).json({ message: `the user ${lastname} ${forname} already exist` })
        }
        else {
            //create user in the db
            await User.create({ lastname, forname, mail, address })
            return res.status('').json({ message: `the user ${lastname} ${forname} created successfully` })
        }
    } catch (err) { throw err }
}

exports.findUser = async (user) => {
    try {
        //testing if user is null
        if (user == null) {
            console.log(`user is null, cannot find it`)
            return null
        }
        const existingUser = await User.findOne(user)

        //testing if user not exist
        if (!existingUser) {
            console.log(`user ${user.lastname} ${user.forname} doesn't exist`)
            return null
        }
        else {
            console.log(`user ${user.lastname} ${user.forname} exist`)
            return user
        }
    } catch (err) { }
}

exports.deleteUser = async (user) => {
    try {
        await User.deleteOne(user)
        console.log(`user ${user.lastname} ${user.forname} deleted`)
    } catch (err) { }
}

exports.setUser = async ({ lastname, forname, mail, address }, user) => {
    try {
        user.lastname = lastname
        user.forname = forname
        user.mail = mail
        user.address = address
        await user.save()
    } catch (err) { }
}

exports.setUserLastname = async ({ lastname }, user) => {
    try {
        user.lastname = lastname
        await user.save()
    } catch (err) { }
}

exports.setUserForname = async ({ forname }, user) => {
    try {
        user.forname = forname
        await user.save()
    } catch (err) { }
}

exports.setUserMail = async ({ mail }, user) => {
    try {
        user.mail = mail
        await user.save()
    } catch (err) { }
}

exports.setUserAddress = async ({ address }, user) => {
    try {
        user.address = address
        await user.save()
    } catch (err) { }
}
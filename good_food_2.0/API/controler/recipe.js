const Recipe = require("../model/recipe")

exports.getAllRecipes = (req, res) => {
    Recipe.findAll()
        .then(recipes => res.json({ data: recipes }))
        .catch(err => res.status(500).json({ message: `Database error`, error: err }))
}
exports.createRecipe = async (req, res) => {
    try {
        const { lastname, forname, mail, address } = req.body

        //testing if needed informations about recipe are not null
        if (!lastname || !forname || !mail || !address) {
            return res.status(400).json({ message: `at least on field are missing` })
        }

        const existingRecipe = await Recipe.findOne({ mail: mail })

        //testing if recipe not exist
        if (existingRecipe) {
            return res.status(409).json({ message: `the recipe ${lastname} ${forname} already exist` })
        }
        else {
            //create recipe in the db
            await Recipe.create({ lastname, forname, mail, address })
            return res.status('').json({ message: `the recipe ${lastname} ${forname} created successfully` })
        }
    } catch (err) { throw err }
}

exports.findRecipe = async (recipe) => {
    try {
        //testing if recipe is null
        if (recipe == null) {
            console.log(`recipe is null, cannot find it`)
            return null
        }
        const existingRecipe = await Recipe.findOne(recipe)

        //testing if recipe not exist
        if (!existingRecipe) {
            console.log(`recipe ${recipe.lastname} ${recipe.forname} doesn't exist`)
            return null
        }
        else {
            console.log(`recipe ${recipe.lastname} ${recipe.forname} exist`)
            return recipe
        }
    } catch (err) { }
}

exports.deleteRecipe = async (recipe) => {
    try {
        await Recipe.deleteOne(recipe)
        console.log(`recipe ${recipe.lastname} ${recipe.forname} deleted`)
    } catch (err) { }
}

exports.setRecipe = async ({ lastname, forname, mail, address }, recipe) => {
    try {
        recipe.lastname = lastname
        recipe.forname = forname
        recipe.mail = mail
        recipe.address = address
        await recipe.save()
    } catch (err) { }
}

exports.setRecipeLastname = async ({ lastname }, recipe) => {
    try {
        recipe.lastname = lastname
        await recipe.save()
    } catch (err) { }
}

exports.setRecipeForname = async ({ forname }, recipe) => {
    try {
        recipe.forname = forname
        await recipe.save()
    } catch (err) { }
}

exports.setRecipeMail = async ({ mail }, recipe) => {
    try {
        recipe.mail = mail
        await recipe.save()
    } catch (err) { }
}

exports.setRecipeAddress = async ({ address }, recipe) => {
    try {
        recipe.address = address
        await recipe.save()
    } catch (err) { }
}
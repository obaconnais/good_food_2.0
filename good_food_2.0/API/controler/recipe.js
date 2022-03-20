const Recipe = require("../model/recipe")

module.exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients } = req.body

        //testing if needed informations about recipe are not null
        if (!name || !ingredients) {
            return res.status(400).json({ message: `at least on field are missing` })
        }

        const existingRecipe = await Recipe.findOne({ name: name })

        //testing if recipe not exist
        if (existingRecipe) {
            return res.status(409).json({ message: `the recipe ${name} already exist` })
        }
        else {
            //create recipe in the db
            await Recipe.create({ name, ingredients })
            return res.status('').json({ message: `the recipe ${name} created successfully` })
        }
    } catch (err) { throw err }
}

module.exports.findRecipe = async (recipe) => {
    try {
        //testing if recipe is null
        if (recipe == null) {
            console.log(`recipe is null, cannot find it`)
            return null
        }
        const existingRecipe = await Recipe.findOne(recipe)

        //testing if recipe not exist
        if (!existingRecipe) {
            console.log(`recipe ${recipe.name} doesn't exist`)
            return null
        }
        else {
            console.log(`recipe ${recipe.name} exists`)
            return recipe
        }
    } catch (err) { }
}

module.exports.deleteRecipe = async (recipe) => {
    try {
        await Recipe.deleteOne(recipe)
        console.log(`recipe ${recipe.name} deleted`)
    } catch (err) { }
}

module.exports.setRecipe = async ({ name, ingredients }, recipe) => {
    try {
        recipe.name = name
        recipe.ingredients = ingredients
        await recipe.save()
    } catch (err) { }
}

module.exports.setRecipeName = async ({ name }, recipe) => {
    try {
        recipe.name = name
        await recipe.save()
    } catch (err) { }
}

module.exports.setRecipeForname = async ({ ingredients }, recipe) => {
    try {
        recipe.ingredients = ingredients
        await recipe.save()
    } catch (err) { }
}

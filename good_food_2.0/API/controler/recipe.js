const Recipe = require("../model/recipe")

exports.getAllRecipes = (req, res) => {
    Recipe.findAll()
        .then(recipes => res.json({ data: recipes }))
        .catch(err => res.status(500).json({ message: `Database error`, error: err }))
}
exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredient } = req.body

        //testing if needed informations about recipe are not null
        if (!name || !ingredient) {
            return res.status(400).json({ message: `at least on field is missing` })
        }

        const existingRecipe = await Recipe.findOne({ name: name })

        //testing if recipe not exist
        if (existingRecipe) {
            return res.status(409).json({ message: `the recipe ${name} already exist` })
        }
        else {
            //create recipe in the db
            await Recipe.create({ name, ingredient })
            return res.status('').json({ message: `the recipe ${name} created successfully` })
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
            console.log(`recipe ${recipe.name} doesn't exist`)
            return null
        }
        else {
            console.log(`recipe ${recipe.name} exists`)
            return recipe
        }
    } catch (err) { }
}

exports.deleteRecipe = async (recipe) => {
    try {
        await Recipe.deleteOne(recipe)
        console.log(`recipe ${recipe.name} deleted`)
    } catch (err) { }
}

exports.setRecipe = async ({ name, ingredient }, recipe) => {
    try {
        recipe.name = name
        recipe.ingredient = ingredient
        await recipe.save()
    } catch (err) { }
}

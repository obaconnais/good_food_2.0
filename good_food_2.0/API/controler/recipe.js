const Recipe = require("../model/recipe")

exports.getAllRecipes = (req, res) => {
    Recipe.findAll()
        .then(recipes => res.json({ data: recipes }))
        .catch(err => res.status(500).json({ message: `Database error`, error: err }))
}
exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredient } = req.body

        if (!name || !ingredient) {
            return res.status(400).json({ message: `at least on field is missing` })
        }

        const existingRecipe = await Recipe.findOne({ name: name })

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
        if (recipe == null) {
            console.log(`recipe is null, cannot find it`)
            return null
        }
        const existingRecipe = await Recipe.findOne(recipe)

        if (!existingRecipe) {
            console.log(`recipe ${recipe.name} doesn't exist`)
            return null
        }
        else {
            console.log(`recipe ${recipe.name} exists`)
            return recipe
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

exports.getRecipe = async (recipe) => {
    try {
        const { name } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Id is not defined, cannot find any restaurant' })
        }
        const existingRecipe = await Restaurant.findOne({ name: name })

        if (!existingRecipe) {
            return res.status(200).json({ found: false })
        }
        else {
            return res.status(200).json({ found: true, data: existingRecipe })
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

exports.deleteRecipe = async (recipe) => {
    try {
        await Recipe.deleteOne(recipe)
        console.log(`recipe ${recipe.name} deleted`)
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

exports.setRecipe = async ({ name, ingredient }, recipe) => {
    try {
        recipe.name = name
        recipe.ingredient = ingredient
        await recipe.save()
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

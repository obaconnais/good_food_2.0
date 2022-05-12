const Recipe = require("../model/recipe")

module.exports.getAllRecipes = async (req, res) => {
    try {
        const foundRecipes = await Recipe.find({})

        if (!foundRecipes)
            return res.status(400).json({ message: `Recipe not found` })

        return res.status(200).json({ data: foundRecipes })
    } catch (err) {
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.createRecipe = async (req, res) => {
    try {
        // return res.status(200).json({ message: `Ca marche` })
        const { name, ingredients, price } = req.body

        if (!name || !ingredients || !price) {
            return res.status(400).json({ message: `At least on field is missing` })
        }

        const existingRecipe = await Recipe.findOne({ name: name })

        if (existingRecipe) {
            return res.status(409).json({ message: `the recipe ${name} already exists` })
        }
        else {
            await Recipe.create({ name, ingredients, price })
            return res.status('').json({ message: `Recipe ${name} created successfully` })
        }
    } catch (err) { return res.status(500).json({ message: `Internal error` }) }
}

module.exports.findRecipe = async (req, res) => {
    try {
        const { name } = req.body

        if (!name)
            return res.status(400).json({ message: `at least one field are missing` })

        const foundRecipe = await Recipe.findOne({ body: { name: name } })

        if (!foundRecipe)
            return res.status(400).json({ message: `Recipe not found` })

        return res.status(200).json({ data: foundRecipe })
    } catch (err) {
        return res.status(500).json({ message: `Internal error` })
    }
}

exports.getRecipe = async (recipe) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Id is not defined, cannot find any restaurant' })
        }
        const existingRecipe = await Restaurant.findOne({ _id: id })

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

module.exports.deleteRecipe = async (recipe) => {
    try {
        await Recipe.deleteOne(recipe)
        console.log(`recipe ${recipe.name} deleted`)
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}


module.exports.setRecipe = async ({ name, ingredient, price }, recipe) => {
    try {
        recipe.name = name
        recipe.ingredient = ingredient
        recipe.price = price
        await recipe.save()
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}



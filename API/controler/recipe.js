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
        const { name, ingredients, price } = req.body

        if (!name || !ingredients || !price) {
            return res.status(400).json({ message: `At least one field is missing` })
        }
        const existingRecipe = await Recipe.findOne({ name: name })

        if (existingRecipe) {
            return res.status(409).json({ message: `Recipe ${name} already exists` })
        }
        else {
            await Recipe.create({ name, ingredients, price })
            return res.status(201).json({ message: `Recipe ${name} created successfully` })
        }
    } catch (err) {
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.findRecipe = async (req, res) => {
    try {
        const { name } = req.body
        console.log("name", name)
        if (!name)
            return res.status(400).json({ message: `at least one field are missing` })

        const foundRecipe = await Recipe.findOne({ body: { name: name } })
        console.log(foundRecipe)
        if (!foundRecipe)
            return res.status(400).json({ message: `Recipe ${name} wasn't found`, found: false })

        return res.status(200).json({ data: foundRecipe, found: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal error` })
    }
}

exports.getRecipe = async (req, res) => {
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


module.exports.setRecipe = async ({ name, ingredients, price }, recipe) => {
    try {
        recipe.name = name
        recipe.ingredients = ingredients
        recipe.price = price
        await recipe.save()
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}



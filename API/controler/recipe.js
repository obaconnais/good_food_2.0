const Recipe = require("../model/recipe")

module.exports.getAllRecipes = async (req, res) => {
    try {
        const { restaurant_id } = req.body
        let foundRecipes = []
        if (restaurant_id) {
            foundRecipes = await Recipe.find({ restaurant_id: restaurant_id })
        }
        else {
            foundRecipes = await Recipe.find({})
        }
        console.log(restaurant_id)

        if (!foundRecipes)
            return res.status(400).json({ message: `Recipe not found` })

        return res.status(200).json({ data: foundRecipes })
    } catch (err) {
        console.log(err)
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
        if (!name)
            return res.status(400).json({ message: `at least one field are missing` })

        const foundRecipe = await Recipe.findOne({ body: { name: name } })
        if (!foundRecipe)
            return res.status(400).json({ message: `Recipe ${name} wasn't found`, found: false })

        return res.status(200).json({ data: foundRecipe, found: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params
        console.log("id", id)
        if (!id) {
            return res.status(400).json({ message: 'Id is not defined, cannot find any recipe' })
        }
        const existingRecipe = await Recipe.findOne({ _id: id })

        if (!existingRecipe) {
            return res.status(404).json({ message: `Recipe with id : ${id} wasn't found`, found: false })
        }
        else {
            return res.status(200).json({ found: true, data: existingRecipe })
        }
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}

module.exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        await Recipe.deleteOne({ _id: id })
        console.log(`recipe ${id} deleted`)
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}


module.exports.setRecipe = async (req, res) => {
    try {
        const { name, ingredients, price } = req.body

        recipe.name = name
        recipe.ingredients = ingredients
        recipe.price = price
        await recipe.save()
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}



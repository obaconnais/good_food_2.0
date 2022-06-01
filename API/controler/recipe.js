const Recipe = require("../model/recipe")

module.exports.getAllRecipes = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        console.log(restaurant_id)
        let foundRecipes = []
        let found = []
        let result = []
        if (!restaurant_id)
            console.log("test")
        if (Object.keys(restaurant_id).length != 0) {
            foundRecipes = await Recipe.where('restaurant_id').in([restaurant_id])
            console.log("found recipe: " + foundRecipes)
            found = await Recipe.find({ restaurant_id: [] })
            console.log("found" + found)
            result = [...foundRecipes, ...found]
        }
        else {
            result = await Recipe.find({ restaurant_id: [] })
        }
        if (result.length == 0)
            return res.status(204).json({ message: `Recipe not found` })
        console.log(result)
        return res.status(200).json({ data: result })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients, price, restaurant_id, image_name } = req.body
        if (!name || !ingredients || !price || !restaurant_id || !image_name) {
            return res.status(400).json({ message: `At least one field is missing` })
        }
        const existingRecipe = await Recipe.findOne({ name: name })

        if (existingRecipe) {
            return res.status(409).json({ message: `Recipe ${name} already exists` })
        }
        else {
            await Recipe.create({ name, ingredients, price, restaurant_id, image_name })
            return res.status(201).json({ message: `Recipe ${name} created successfully` })
        }
    } catch (err) {
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.findRecipe = async (req, res) => {
    try {
        const name = req.params.name
        if (Object.keys(name).length == 0)
            return res.status(400).json({ message: `at least one field are missing` })

        const foundRecipe = await Recipe.find({ name: name })

        if (foundRecipe.length == 0)
            return res.status(400).json({ message: `Recipe ${name} wasn't found`, found: false })

        return res.status(200).json({ data: foundRecipe, found: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal error` })
    }
}

module.exports.getRecipeById = async (req, res) => {
    try {
        const id = req.params.id

        if (Object.keys(id).length == 0) {
            return res.status(400).json({ message: 'Id is not defined, cannot find any recipe' })
        }

        const existingRecipe = await Recipe.find({ _id: id })

        if (existingRecipe.length == 0) {
            return res.status(404).json({ message: `Recipe with id : ${id} wasn't found`, found: false })
        }
        else {
            return res.status(200).json({ found: true, data: existingRecipe[0] })
        }
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}

module.exports.deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id
        await Recipe.deleteOne({ _id: id })
        return res.status(200).json({ message: `recipe ${id} deleted` })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}

module.exports.setRecipe = async (req, res) => {
    try {
        const { _id, name, ingredients, price, restaurant_id, image_name } = req.body
        // if not Id, cannot find a recipe
        if (!_id)
            return res.status(400).json({ message: "Id is null, can not find any recipe" })
        //try to find the recipe recipe    
        let recipeFind = await Recipe.findOne({ id: _id })
        //if not found, return an error
        if (!recipeFind)
            return res.status(400).json({ message: "no recipe found" })
        if (name) {
            recipeFind.name = name
        }
        if (ingredients) {
            recipeFind.ingredients = ingredients
        }
        if (price) {
            recipeFind.price = price
        }
        if (restaurant_id) {
            recipeFind.restaurant_id = restaurant_id
        }
        if (image_name) {
            recipeFind.restaurant_id = image_name
        }
        await recipeFind.save()
        return res.status(200).json({ message: `the recipe with id ${_id} setted succesfully` })
    } catch (err) {
        console.log("err", err)
        return res.status(500).json({ message: err })
    }
}



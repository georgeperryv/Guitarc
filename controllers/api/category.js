const Category = require('../../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function addCategory (req, res) {
  console.log('req.body', req.body)
  try {
    if (await Category.exists({ category: req.body.category })) {
      console.log('not new try again')
      return res.json('Please enter a unique category')
    } else {
      const category = new Category(req.body)
      await category.save()

      return res.json(category)
    }
  } catch (error) {
    console.log('error')
  }
}

async function index (req, res) {
  const items = await Category.find({})
    .sort('category')
    .populate('category')
    .exec()
  // re-sort based upon the sortOrder of the categories
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder)
  res.json(items)
}

module.exports = {
  addCategory,
  index
}

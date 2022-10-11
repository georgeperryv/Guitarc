const Category = require('../../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function addCategory (req, res) {
  try {
    console.log('this is req.body', req.body)
    console.log('this is req.body.category', req.body.category)
    // const collection = await Collection.create(req.body)
    const category = new Category(req.body)
    await category.save()
    console.log('this is category', category)
    return res.json(category)
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

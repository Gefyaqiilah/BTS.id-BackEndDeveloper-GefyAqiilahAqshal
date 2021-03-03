const shoppingModel = require('../models/shopping');

const shoppingControllers = {
  newShopping: async (req, res, next) => {
    const {shopping: {createddate, name}} = req.body
    if (!createddate || !name) {
      return res.status(400).json({message: 'cannot empty'})
    }
    const payload = {
      CreatedDate: createddate,
      Name: name
    }
    try {
      await shoppingModel.newShopping(payload)
      const dataCreated = await shoppingModel.getDataByDate(createddate)
      res.status(200).json(dataCreated)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllShopping: async (req, res, next) => {
    try {
      const shoppings = await shoppingModel.getAllShopping()
      res.status(200).json({data: shoppings})
    } catch (error) {
      res.status(200).json(error)
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.id
    try {
      const data = await shoppingModel.getById(id)
      res.status(200).json({data})
    } catch (error) {
      res.status(500).json(error)
    }
  },
  deleteShopping: async (req, res, next) => {
    const id = req.params.id
    try {
      await shoppingModel.deleteShopping(id)
      res.status(200).json({message: 'data has been deleted'})
    } catch (error) {
      res.status(500).json(error)
    }
  },
  updateShopping: async (req, res, next) => {
    const id = req.params.id
    const {shopping: {createddate, name}} = req.body
    const payload = {
      CreatedDate: createddate,
      name: name
    }
    try {
      await shoppingModel.updateShopping(id, payload)
      res.status(200).json({message: 'data has been updated'})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = shoppingControllers
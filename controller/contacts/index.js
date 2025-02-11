const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const deleteContact = require("./deleteContact");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");
const getAllPaginate = require("./getAllPaginate");
const getAllFavorite = require("./getAllFavorite");

module.exports = {
  getAll,
  getById,
  add,
  deleteContact,
  updateById,
  updateStatusContact,
  getAllPaginate,
  getAllFavorite,
};

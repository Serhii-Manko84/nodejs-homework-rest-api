const paginate = require("mongoose-paginate");
const { Contact } = require("../../models/contacts");

const getAllPaginate = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(reg.query.limit) || 5;
  const options = {
    page,
    limit,
    sort: { phone: 1 },
  };
  const result = await Contact.paginate({}, options);
  res.json(result);
};

module.exports = getAllPaginate;

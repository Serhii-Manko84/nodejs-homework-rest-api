const { Contact } = require("../../models/contacts");

const getAllPaginate = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const options = {
    page,
    limit,
    sort: { name: 1 },
  };
  const result = await Contact.paginate({}, options);
  res.json(result);
};

module.exports = getAllPaginate;

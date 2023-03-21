const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  subscription,
  updateAvatar,
  verify,
  resendEmail,
};

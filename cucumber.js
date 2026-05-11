module.exports = {
  default: {
    require: [
      "features/step-definitions/*.js",
      "hooks/*.js",
      "utils/*.js"
    ],
    format: ["progress"],
    timeout: 60000
  }
};

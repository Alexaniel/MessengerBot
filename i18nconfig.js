const i18n = require("i18n"),
  path = require("path");

i18n.configure({
  locales: [
    "es_ES",
  ],
  defaultLocale: "es_ES",
  directory: path.join(__dirname, "language"),
  objectNotation: true,
  api: {
    __: "translate",
    __n: "translateN"
  }
});

module.exports = i18n;
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

module.exports = {
    resources: [`tcp:${port}`],
};

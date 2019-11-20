/**
 *
 * Created by shenzaifang on 2019-11-20
 */
if (process.env.NODE_ENV === "production") {
    module.exports = require("./dist/large-number.min.js");
} else {
    module.exports = require("./dist/large-number.js");
}

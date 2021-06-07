const userValidate = require('./userValidate');
const JWTValidate = require('./JWTValidate');
const isADMIN = require('./roleValidate');

module.exports = {
    //con ... exporta todo del archivo
    ...JWTValidate,
    ...userValidate,
    ...isADMIN
}
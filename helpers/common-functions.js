"use strict"
const cnBase58 = require('mymonero-core-js/cryptonote_utils/cryptonote_base58').cnBase58

module.exports = {
    checkAddressXtz: function (a) {
        let supportedPrefixes = ['tz1', 'tz2', 'tz3']
        if (supportedPrefixes.some(substring => a.includes(substring))) {
            try {
                cnBase58.decode(a.slice(3))
                return true
            }
            catch (e) {
                return false
            }
        } else {
            return false
        }
    }
}
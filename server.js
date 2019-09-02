"use strict"
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const fastify = require('fastify')({ logger: true })
const conseiljs = require('conseiljs')
const cnBase58 = require('./node_modules/mymonero-core-js/cryptonote_utils/cryptonote_base58').cnBase58
const common = require('./helpers/common-functions')
const TronWeb = require('tronweb')
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
})
fastify.register(require('fastify-formbody'))

fastify.post('/validate-xtz-address', async (request, reply) => {
    if (typeof (request.body.address) != "undefined" && request.body.address != null) {
        let supportedPrefixes = ['tz1', 'tz2', 'tz3']
        if (supportedPrefixes.some(substring => (request.body.address).includes(substring))) {
            try {
                cnBase58.decode((request.body.address).slice(3))
                reply
                    .code(200)
                    .header('Access-Control-Allow-Origin', '*')
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ 'success': 'Correct xtz address provided' })
            }
            catch (e) {
                reply
                    .code(400)
                    .header('Access-Control-Allow-Origin', '*')
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ 'error': 'Please provide correct xtz address' })
            }
        } else {
            reply
                .code(400)
                .header('Access-Control-Allow-Origin', '*')
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ 'error': 'Please provide correct xtz address' })
        }
    } else {
        reply
            .code(400)
            .header('Access-Control-Allow-Origin', '*')
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ 'error': 'Please provide xtz address' })
    }
})

fastify.post('/check-balance', async (request, reply) => {
    if (typeof (request.body.address) != "undefined" && request.body.address != null && common.checkAddressXtz(request.body.address) == true) {
        if (request.body.network == 'alphanet') {
            var tezosNode = 'https://alphanet-node.tzscan.io'
        } else {
            var tezosNode = 'https://mainnet-node.tzscan.io'
        }
        const result = await conseiljs.TezosNodeReader.getAccountForBlock(tezosNode, 'head', request.body.address)
        reply
            .code(200)
            .header('Access-Control-Allow-Origin', '*')
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ 'balance': tronWeb.fromSun(result.balance) })
    } else {
        reply
            .code(400)
            .header('Access-Control-Allow-Origin', '*')
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ 'error': 'Please provide valid xtz address' })
    }
})

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    const start = async () => {
        try {
            await fastify.listen(3000, '0.0.0.0')
        } catch (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    }
    start()
}
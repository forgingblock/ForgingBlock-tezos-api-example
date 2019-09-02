# Tezos API Example

During [TQ tezos hackathon](http://ideo.tqtezos.com/) our main idea was to implement Tezos support for [Forging Block Universal API](https://api.forgingblock.io/docs/#fbuni).

And while the main product is proprietary, in this public repository we show example of how exactly we interact with tezos blockchain using [conseiljs](https://github.com/Cryptonomic/ConseilJS). So the tezos community could get and idea how easy to use community provided libraries even in such complex project as [Forging Block Universal API](https://api.forgingblock.io/docs/#fbuni).

## Endpoints

We have just to two endpoints and this repository. 

First shows example how to validate tezos address, and second shows wallet account balance ether for mainnet or alphanet.

- `POST /validate-xtz-address`

Request example:

```bash
curl 'http://127.0.0.1:3000/validate-xtz-address' -H 'Content-Type: application/x-www-form-urlencoded' --data 'address=tz1isXamBXpTUgbByQ6gXgZQg4GWNW7r6rKE'
```

Response examples:
```json
{"success":"Correct xtz address provided"}
{"error":"Please provide correct xtz address"}
{"error":"Please provide xtz address"}
```

- `POST /check-balance`

Request examples:
```bash
curl 'http://127.0.0.1:3000/check-balance' -H 'Content-Type: application/x-www-form-urlencoded' --data 'address=tz1TaLYBeGZD3yKVHQGBM857CcNnFFNceLYh'
curl 'http://127.0.0.1:3000/check-balance' -H 'Content-Type: application/x-www-form-urlencoded' --data 'address=tz1TaLYBeGZD3yKVHQGBM857CcNnFFNceLYh&network=alphanet'
```

Response examples:
```json
{"balance":"271971.864666"}
{"error":"Please provide valid xtz address"}
```

## Running

Just clone, `npm install` and `node .`

Overall: 

```bash
git clone https://github.com/forgingblock/tezos-api-example
cd tezos-api-example
npm install
node .
```
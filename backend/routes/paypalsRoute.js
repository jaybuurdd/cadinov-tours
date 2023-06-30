import fetch from 'node-fetch'


const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_SECRET
const base = process.env.NODE_ENV === 'production' ? "https://api-m.paypal.com" :"https://api-m.sandbox.paypal.com";
const express = require('express')
const router = express.Router()


router.post('/create_order', (req, res) => {
    generateAccessToken()
    .then(accessToken => {
        let order_data_json = {
            'intent': req.body.intent.toUpperCase(),
            'purchase_units': [
                {
                    'amount': {
                        'currency_code': 'USD',
                        'value': '100.00'
                    },
                }
            ]
        };

        const data = JSON.stringify(order_data_json)

        fetch(`${base}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'PayPal-Request-Id': generateRandomUUID()
            },
            body: data
        })
        .then(res => res.json())
        .then(json => { res.send(json); })
    })
    .catch(err => { console.log(err); res.status(500).send(err)})

})

// app.post('/complete_order', (req, res) => {
//     generateAccessToken()
//     .then(accessToken => {
//         fetch(`${base}/v2/checkout/orders/${req.body.order_id}/${req.body.intent}`, {
//             method: 'POST',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`,
//             }
//         })
//         .then(res => res.json())
//         .then(json => { console.log(json); res.send(json); })
//     })
//     .catch(err => { console.log(err); res.status(500).send(err)})
// })

// async function generateRandomUUID () {
//     return;
// }

async function generateAccessToken() {
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
        },
        body: data
    })
    .then(res => res.json())
    .then(json => { return json.accessToken; })
}
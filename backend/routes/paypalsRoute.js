// import fetch from 'node-fetch'

// const {CLIENT_ID, APP_SECRET} = process.env
// const base = "https://api-m.sandbox.paypal.com";

// export async function createOrder(){

//     const accessToken = await generateAccessToken();
//     const url = `${base}/v2/checkout/orders`;
//     const response = await fetch(url,  {
//         method:"post",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },

//         body: JSON.stringify({
//             intent:"CAPTURE",// capture api returned data
//             purchase_units:[
//                 {
//                     amount: {
//                         currency_code:"USD",
//                         value: "100.00",
//                     },
//                 },

//             ],
//         }),
//     });

//     return handleResponse(response)
// }
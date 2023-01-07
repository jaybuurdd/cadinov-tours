import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';

function PaymentScreen({ price, totalamount }){
  

  const paypalRan = useRef(false)

  const [excursion, setExcursion] = useState()

  const PaypalButtons = () => {

    useEffect(() => {
      console.log('total ' + totalamount
      )

      if(paypalRan.current === false){
          
        const paypalButtonsComponent = window.paypal.Buttons({
          // optional styling for buttons
          // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
          style: {
            color: "blue",
            shape: "pill",
            layout: "vertical"
          },
          
          // set up the transaction
          createOrder: (data, actions) => {
              // pass in any options from the v2 orders create call:
              // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
              const createOrderPayload = {
                
                  purchase_units: [
                      {
                          amount: {
                              value: price
                          }
                      }
                  ]
              };

              return actions.order.create(createOrderPayload);
          },

          // finalize the transaction
          onApprove: (data, actions) => {
              const captureOrderHandler = (details) => {
                  const payerName = details.payer.name.given_name;
                  console.log('Transaction completed');
              };

              return actions.order.capture().then(captureOrderHandler);
          },

          // handle unrecoverable errors
          onError: (err) => {
              console.error('An error prevented the buyer from checking out with PayPal');
          }
      });
     
      paypalButtonsComponent
          .render("#paypal-button-container")
          .catch((err) => {
              console.error('PayPal Buttons failed to render');
          });

    paypalRan.current = true
   
  }
    }, [totalamount]);

    return (
      
      <div id='root'>
        <div id="smart-button-container" style={{textAlign: 'center', marginTop: '100px'}}>
          <div style={{textAlign: 'center'}}>
            <div id="paypal-button-container"></div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // update the payment amount in the PayPal button
    document.querySelector("button").dataset.amount = totalamount * 100;
  }, [totalamount]); // update the payment amount when totalamount changes

  return (
    
    <React.Fragment>

      <PaypalButtons />
      {/* Other components go here */}
    </React.Fragment>
  );
}

export default PaymentScreen;

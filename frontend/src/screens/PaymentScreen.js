import React, { useEffect, useRef} from 'react';
import Swal from 'sweetalert2';
import { useLocation, useHistory } from 'react-router-dom';
import axios from '../components/AxiosInstance';

function PaymentScreen(){
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const bookingDetails = JSON.parse(decodeURIComponent(searchParams.get('details')));

  const paypalRan = useRef(false)
  const PaypalButtons = () => {

    useEffect(() => {

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
                          'amount': {
                              'value': bookingDetails.totalamount
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
                  Swal.fire(
                    'Booking Successful!',
                    `Your adventure awaits ${payerName}!`,
                    'success'
                  ).then(result => {
                    history.push('/profile')
                  })
                  axios.post('/api/bookings/bookexcursion', bookingDetails)
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
    }, [bookingDetails.totalamount]);

    return (
      
      <div id='root'>
        <div id="smart-button-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{textAlign: 'center'}}>
            <div id="paypal-button-container"></div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // update the payment amount in the PayPal button
    document.querySelector("button").dataset.amount = bookingDetails.totalamount * 100;
  }, [bookingDetails.totalamount]); // update the payment amount when totalamount changes

  return (
    
    <React.Fragment>
      <PaypalButtons />
    </React.Fragment>
  );
}

export default PaymentScreen;
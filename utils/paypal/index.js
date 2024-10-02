// utils/paypal/index.js
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const configureEnvironment = function () {

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const clientSecret= process.env.REACT_APP_PAYPAL_SECRET;
console.log(clientId,clientSecret);
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
}

export default client;

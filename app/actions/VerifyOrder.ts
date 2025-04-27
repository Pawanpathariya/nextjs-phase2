'use server';

import crypto from 'crypto';

// Verifies the payment signature from Razorpay
export async function verifyOrder(orderId: string, razorpayPaymentId: string, razorpaySignature: string) {
  const body = `${orderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');

  console.log('Expected Signature:', expectedSignature);
  console.log('Received Razorpay Signature:', razorpaySignature);

  if (expectedSignature === razorpaySignature) {
    return { isOk: true };
  } else {
    console.error('Signature mismatch!');
    return { isOk: false };
  }
}

import bcryptjs from 'bcryptjs';
import db from '@/Utils/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/jwt';



async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getToken({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }


 
  
  await db.connect();
  const order = await Order.findById(req.query.id);
  const {isPaid, paidAt} =  req.body
  const toUpdateOrder = await Order.findById(order);
   // i nidde to update ispaid, paidat, paymentmethod

  toUpdateOrder.isPaid = isPaid;

  
  toUpdateOrder.paidAt = paidAt
  
  await toUpdateOrder.save();
  await db.disconnect();
  res.send({
    message: 'Order updated',
  });
}

export default handler;

import db from '@/Utils/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const session = await getToken({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;

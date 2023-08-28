import db from '@/Utils/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  try {
    const session = await getToken({ req });
    if (!session) {
      return res.status(401).send('signin required');
    }

    const { user } = session;
    console.log(session);

    // Make sure the database is properly configured and connected before this point
    await db.connect();

    const newOrder = new Order({
      ...req.body,
      user: user._id,
    });

    // Make sure the Order model's schema and save method are functioning correctly
    const order = await newOrder.save();

    res.status(201).send(order);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
};

export default handler;

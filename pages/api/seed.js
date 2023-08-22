import data from '@/Utils/data';
import db from '@/Utils/db';
import Product from '@/models/Product';
import User from '@/models/User';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;

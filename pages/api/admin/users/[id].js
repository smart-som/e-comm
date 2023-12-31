import db from '@/Utils/db';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const deleteHandler = async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOneAndDelete({ _id: req.query.id });

    if (user) {
      if (user.email === 'admin@example.com') {
        return res.status(400).send({ message: 'Cannot delete admin' });
      }
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    await db.disconnect();
  }
};

export default handler;

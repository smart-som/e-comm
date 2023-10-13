import db from '@/Utils/db';
import Product from '@/models/Product';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  try {
    const user = await getToken({ req });
    if (!user || (user && !user.isAdmin)) {
      return res
        .status(401)
        .send({ message: 'Sign in as an admin is required' });
    }

    if (req.method === 'GET') {
      getHandler(req, res);
    } else if (req.method === 'PUT') {
      putHandler(req, res);
    } else if (req.method === 'DELETE') {
      deleteHandler(req, res);
    } else {
      res.status(400).send({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getHandler = async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    await db.disconnect();
  }
};

const putHandler = async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
      // Update product properties here
      await product.save();
      res.send({ message: 'Product updated successfully' });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    await db.disconnect();
  }
};

const deleteHandler = async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      await db.disconnect();
      res.send({ message: 'Product deleted successfully' });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default handler;

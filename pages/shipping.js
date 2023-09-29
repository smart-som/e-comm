import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from '@/Utils/Store';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('phone_number', shippingAddress.phone_number);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    phone_number,
    country,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, phone_number, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          phone_number,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            className="w-full"
            id="phone_number"
            {...register('phone_number', {
              required: 'Please enter Phone number',
            })}
          />
          {errors.phone_number && (
            <div className="text-red-500 ">{errors.phone_number.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button w-full">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;

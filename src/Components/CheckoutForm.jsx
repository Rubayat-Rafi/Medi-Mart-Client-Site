import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import PropTypes from 'prop-types';
import useCart from "../hook/useCart";

const CheckoutForm = ({ onPaymentSuccess }) => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [carts] = useCart();
  console.log(carts)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  // Function to handle form submission
  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create Stripe payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: data.name,
        email: data.email,
        address: { line1: data.address },
      },
    });

    if (error) {
      console.error(error);
      toast.error("Payment failed!");
    } else {
      // Proceed to confirm the payment
      confirmPayment(paymentMethod);
    }
  };

  // Function to confirm the payment
  const confirmPayment = async (paymentMethod) => {
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (paymentIntent.status === 'succeeded') {
      try {
        await axiosSecure.post('/order', {
          email: user.email,
          paymentIntentId: paymentIntent.id,
        });

        // Proceed to reduce quantities in the database for cart items
        // for (let item of carts) {
        //   await axiosSecure.patch(`/plants/quantity/${item._id}`, {
        //     quantityToUpdate: item.count,
        //     status: 'decrease',
        //   });
        // }
        toast.success('Order successful!');
        onPaymentSuccess(paymentMethod); 
      } catch {
        toast.error('Something went wrong while processing your order!');
      }
    } else {
      toast.error('Payment failed!');
    }
  };

  // Use useEffect to fetch the clientSecret when the component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      const cartResponse = await axiosSecure.post('/create-payment-intent', {
        count: 1,  
        email: user.email,
      });

      setClientSecret(cartResponse.data.clientSecret);
    };

    fetchClientSecret();
  }, [user.email, axiosSecure]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            defaultValue={user?.displayName}
            disabled
            className="w-full p-2 border rounded-md border-gray-300"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={user?.email}
            disabled
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: "Address is required" })}
            className={`w-full p-2 border rounded-md ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Shipping address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border rounded-lg py-2 px-1">
          <h1 className="text-primaryTextColor">Grand total price: </h1>
          <div>
            <p className="text-lg font-bold text-red-500">654 Taka</p>{" "}
          </div>
        </div>

        {/* Card Element */}
        <div>
          <label htmlFor="card" className="block font-medium mb-1">
            Card Details
          </label>
          <div className="p-2 border rounded-md">
            <CardElement
              id="card"
              className="p-2"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-mainColor text-white py-2 rounded-md hover:bg-secondBgColor"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};


CheckoutForm.propTypes = {
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutForm;


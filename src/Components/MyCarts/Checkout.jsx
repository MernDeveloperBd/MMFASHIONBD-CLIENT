import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../AuthProvider/CartContext";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // MyCart থেকে পাঠানো ডাটা
  const { finalPrice, couponCode, discountAmount } = location.state || {};

  const { cartItems, fetchCart } = useCart();
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.address ||
      !customerInfo.city ||
      !customerInfo.postalCode
    ) {
      toast.error("Please fill in all customer details.");
      return;
    }

    setSubmitting(true);

    try {
      const userId = user?.uid || user?.email || "guest";
      const token = localStorage.getItem("access-token");

      const orderData = {
        userId,
        customer: customerInfo,
        items: cartItems.map((item) => ({
          productId: item.productId || item._id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        totalPrice: finalPrice || cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        discountApplied: discountAmount || 0,
        couponCode: couponCode || null,
        orderDate: new Date(),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.insertedId) {
        // কার্ট থেকে আইটেম ডিলিট করো
        for (const item of cartItems) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/cart-item/${item._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        // কার্ট রিফ্রেশ করো
        await fetchCart();

        toast.success("Order submitted successfully!");
        navigate("/");
      } else {
        throw new Error("Order submission failed.");
      }
    } catch (error) {
      console.error("Order submit error:", error.response || error.message || error);
      toast.error("Failed to submit order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
      {/* Cart Items List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto border p-4 rounded">
          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: TK {item.price}</p>
                <p>Total: TK {item.price * item.quantity}</p>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Info Form */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitOrder();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customerInfo.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={customerInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={customerInfo.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            required
          ></textarea>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={customerInfo.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={customerInfo.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />

          {/* Display discount and coupon info */}
          {discountAmount > 0 && (
            <p className="text-green-600 font-semibold">
              Discount Applied: TK {discountAmount.toFixed(2)}
            </p>
          )}
         
  {/* Total Price */}
    <p className="text-xl font-bold mt-4">
      Total Price: TK {(finalPrice ?? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2)}
    </p>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
          >
            {submitting ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

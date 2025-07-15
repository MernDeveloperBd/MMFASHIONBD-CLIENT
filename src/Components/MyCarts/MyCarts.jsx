import { useState } from "react";
import { useCart } from "../AuthProvider/CartContext";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const { cartItems, loading, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  // কুপন কোডের জন্য স্টেট
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // ৩০০০ টাকার উপরে অটো ডিসকাউন্ট (১০%)
  const discountThreshold = 3000;
  const discountPercent = 10;

  // কুপন কোড (যেমন: SAVE20), তোমার মতো করে পরিবর্তন করতে পারো
  const validCoupons = {
    SAVE20: 20, // ২০% ডিসকাউন্ট
    OFFER10: 10, // ১০% ডিসকাউন্ট
  };

  // অটো ডিসকাউন্ট চেক (totalPrice > ৩০০০)
  const autoDiscount =
    totalPrice >= discountThreshold ? (totalPrice * discountPercent) / 100 : 0;

  // ইউজার কুপন কোড অ্যাপ্লাই করলে
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = () => {
    const discount = validCoupons[couponCode.toUpperCase()];
    if (!discount) {
      setCouponError("Invalid coupon code.");
      setCouponDiscount(0);
      setCouponApplied(false);
    } else {
      setCouponError("");
      setCouponDiscount((totalPrice * discount) / 100);
      setCouponApplied(true);
    }
  };

  // ফাইনাল প্রাইস হিসাব
  // এখানে ডিসকাউন্ট গুলো যোগ হবে না একসাথে, ইউজার কুপন দিলে সেটা, নাহলে অটো ডিসকাউন্ট।
  const finalDiscount = couponApplied ? couponDiscount : autoDiscount;
  const finalPrice = totalPrice - finalDiscount;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cartItems?.map((item) => (
              <li key={item._id} className="flex items-center py-4 space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: TK {item.price}</p>
                  <p>Total: TK {item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Coupon Input */}
          <div className="mt-6">
            <label className="block mb-2 font-semibold" htmlFor="coupon">
              Have a coupon code?
            </label>
            <div className="flex max-w-sm gap-2">
              <input
                type="text"
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-grow border rounded px-3 py-2"
                disabled={couponApplied}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={couponApplied || !couponCode.trim()}
                className={`px-4 py-2 rounded text-white ${
                  couponApplied
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {couponApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {couponError && <p className="text-red-600 mt-2">{couponError}</p>}
          </div>

          {/* Price Summary */}
          <div className="text-right mt-6 space-y-2 max-w-sm ml-auto">
            <p className="text-lg font-semibold">
              Subtotal: TK {totalPrice.toFixed(2)}
            </p>
            {autoDiscount > 0 && !couponApplied && (
              <p className="text-green-600 font-semibold">
                10% discount applied for purchases over TK {discountThreshold}
              </p>
            )}
            {couponApplied && (
              <p className="text-green-600 font-semibold">
                Coupon discount applied: TK {couponDiscount.toFixed(2)}
              </p>
            )}
            <p className="text-xl font-bold">Total Price: TK {finalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-600">* Excluding taxes and shipping</p>

            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    finalPrice,
                    couponCode,
                    discountAmount: finalDiscount,
                  },
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Continue to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;

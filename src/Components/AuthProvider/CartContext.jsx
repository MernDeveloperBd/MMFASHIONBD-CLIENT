import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import PropTypes from "prop-types";

const CartContext = createContext();

// custom hook
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ fetchCart function memoized to prevent unnecessary re-renders
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const userId = user.uid || user.email;
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${encodeURIComponent(userId)}`
      );
      setCartItems(data);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart-item/${id}`);
      fetchCart(); // Refresh after removal
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  // ✅ Fetch cart on user change
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ Count total items
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        removeFromCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

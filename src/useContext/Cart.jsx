import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const [cartLoaded, setCartLoaded] = useState(false);
  const [wishListLoaded, setWishListLoaded] = useState(false);

  const getAllCartDetail = async () => {
    try {
      if (cartLoaded) return;

      const res = await fetch(
        "https://modern-mart-backend.vercel.app/api/cart",
      );

      const data = await res.json();

      setCart(data?.data || []);
      setCartLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (product, selectedSize) => {
    if (!selectedSize) {
      toast("Please select the size");
      return;
    }

    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/cart/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productQuantity: 1,
            productSize: selectedSize,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast(data?.message || "Failed to add to cart");
        return;
      }

      toast(`${product.productName} added to cart successfully!`);

      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize,
        );

        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize
              ? {
                  ...item,
                  productQuantity: item.productQuantity + 1,
                }
              : item,
          );
        }

        return [
          ...prev,
          {
            product,
            productQuantity: 1,
            productSize: selectedSize,
          },
        ];
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/deletedCart/${cartId}`,
        {
          method: "DELETE",
        },
      );

      setCart((prev) => prev.filter((item) => item._id !== cartId));

      if (res.ok) {
        toast(`Cart Id deleted Successfully!`);
      } else {
        toast("This Cart Id not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQty = async (productId, qty) => {
    try {
      await fetch(
        `https://modern-mart-backend.vercel.app/api/updatedCart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: qty + 1,
          }),
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                productQuantity: item.productQuantity + 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQty = async (productId, qty) => {
    if (qty <= 1) return;

    try {
      await fetch(
        `https://modern-mart-backend.vercel.app/api/updatedCart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: qty - 1,
          }),
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                productQuantity: item.productQuantity - 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAllWishListDetail = async () => {
    try {
      if (wishListLoaded) return;

      const res = await fetch(
        "https://modern-mart-backend.vercel.app/api/wishlist",
      );

      const data = await res.json();

      setWishList(data?.data || []);

      setWishListLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishList = async (product, selectedSize) => {
    if (!selectedSize) {
      toast("Please select the size");
      return;
    }

    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/wishlist/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productQuantity: 1,
            productSize: selectedSize,
          }),
        },
      );

      const data = await res.json();
      const newWishlist = data?.data;
      console.log("NewWishlistData: ", newWishlist);

      if (!res.ok) {
        toast(data?.message || "Failed to add to wishlist");
        return;
      }

      toast(`${product.productName} added to wishlist successfully!`);

      setWishList((prev) => {
        const existing = prev.find(
          (item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize,
        );

        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id &&
            item.productSize === selectedSize
              ? {
                  ...item,
                  productQuantity: item.productQuantity + 1,
                }
              : item,
          );
        }

        return [
          ...prev,
          {
            _id: newWishlist._id,
            product,
            productQuantity: 1,
            productSize: selectedSize,
          },
        ];
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong");
    }
  };

  const removeToWishlist = async (wishlistId) => {
    try {
      const res = await fetch(
        `https://modern-mart-backend.vercel.app/api/wishlist/${wishlistId}`,
        {
          method: "DELETE",
        },
      );
      const data = res.json();

      if (!res.ok) {
        toast(data?.message || "Something went wrong in wishlist Data");
        return;
      }

      toast("Wishlist item removed successfully!");

      setWishList((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllCart = async () => {
    try {
      const response = await fetch(
        "https://modern-mart-backend.vercel.app/api/cart/deletedAll",
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      console.log(data.message);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete cart");
      }

      setCart([]);
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishList,
        cartLoaded,
        deleteAllCart,
        wishListLoaded,
        getAllCartDetail,
        getAllWishListDetail,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        addToWishList,
        removeToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

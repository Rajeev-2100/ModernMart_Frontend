import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (
    userDetailId,
    userAddressId,
    cartProductQuantity,
    cartId
  ) => {
    try {
      setLoading(true);

      const res = await fetch("https://major-project-backend1.vercel.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: cartId,
          user: userDetailId,
          address: userAddressId,
          quantity: cartProductQuantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setOrders((prev) => [...prev, data.order]);
      navigate("/order");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleAllOrderData = async () => {
    try {
      const res = await fetch("https://major-project-backend1.vercel.app/api/order");
      const data = await res.json();
      
      setOrders(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  const handleOrderDataByOrderId = async (orderId) => {
    if (!orderId) return;

    try {
      setLoading(true);
      setSelectedOrder(null); 

      const res = await fetch(
        `https://major-project-backend1.vercel.app/api/order/${orderId}`
      );
      const data = await res.json();

      if(res.ok){
        toast('Order Data is this')
      }else{
        toast(`Order Data Id not found`)
      }

      setSelectedOrder(data.order || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        selectedOrder,
        handlePayment,
        handleAllOrderData,
        handleOrderDataByOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

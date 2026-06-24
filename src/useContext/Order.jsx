import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fixed: handlePayment with multiple products
  const handlePayment = async (orderData) => {
    try {
      setLoading(true);
      
      console.log('Sending order data:', orderData); // ✅ Debug

      const res = await fetch("https://major-project-backend1.vercel.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData), // ✅ Directly send orderData
      });

      const data = await res.json();
      
      // console.log('Order response:', data); // ✅ Debug

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // ✅ Add new order to orders array
      if (data.order) {
        setOrders((prev) => [data.order, ...prev]);
        console.log('Orders updated:', [data.order, ...orders]); // ✅ Debug
      } else if (data.data) {
        setOrders((prev) => [data.data, ...prev]);
      } else {
        setOrders((prev) => [data, ...prev]);
      }

      toast.success("Order placed successfully! 🎉");
      navigate("/order");
      
      return data;
    } catch (err) {
      console.error("Order Error:", err);
      toast.error(err.message || "Failed to place order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAllOrderData = async () => {
    try {
      setLoading(true);
      console.log('AllOrders:', orders)
      
      const res = await fetch("https://major-project-backend1.vercel.app/api/order");
      const data = await res.json();
      console.log('Res:', res)
      
      console.log('All orders response:', data); // ✅ Debug

      // ✅ Handle different response formats
      if (data && data.data && Array.isArray(data.data)) {
        setOrders(data.data);
      } else if (data && Array.isArray(data)) {
        setOrders(data);
      } else if (data && data?.orders && Array.isArray(data?.orders)) {
        setOrders(data.orders);
      } else {
        console.error('Unexpected data format:', data);
        setOrders([]);
      }
      
      return data;
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      toast.error("Failed to fetch orders");
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

      console.log('Single order response:', data); // ✅ Debug

      if (res.ok) {
        if (data.order) {
          setSelectedOrder(data.order);
        } else if (data.data) {
          setSelectedOrder(data.data);
        } else {
          setSelectedOrder(data);
        }
        toast.success('Order details loaded');
      } else {
        toast.error('Order not found');
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      toast.error("Failed to fetch order details");
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
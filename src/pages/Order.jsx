import OrderHeader from "../components/OrderHeader";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import OrderContext from "../useContext/Order";
import { Link } from "react-router-dom";

const Order = () => {
  const { orders, handleAllOrderData, loading: contextLoading } = useContext(OrderContext);
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedOrders, setSortedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Orders:", orders);

  // ✅ Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await handleAllOrderData();
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // ✅ Sort orders whenever orders or sortOrder changes
  useEffect(() => {
    if (!orders || orders.length === 0) {
      setSortedOrders([]);
      return;
    }

    const sorted = [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0);
      const dateB = new Date(b.createdAt || b.date || 0);

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setSortedOrders(sorted);
  }, [orders, sortOrder]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle reload
  const handleReload = async () => {
    setLoading(true);
    await handleAllOrderData();
    setLoading(false);
  };

  if (loading || contextLoading) {
    return (
      <>
        <OrderHeader />
        <main className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your orders...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <OrderHeader />
      <main className="container py-4 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">My Orders</h3>
          <button
            className="btn btn-outline-primary btn-sm rounded-pill px-4"
            onClick={handleReload}
            disabled={loading || contextLoading}
          >
            <i className="bi bi-arrow-repeat me-1"></i>
            {loading || contextLoading ? "Loading..." : "Reload Orders"}
          </button>
        </div>

        <section className="order-history-section mb-5">
          {sortedOrders.length === 0 ? (
            <div className="alert alert-info text-center shadow-sm">
              <i className="bi bi-inbox me-2"></i>
              No orders found. Start shopping now!
            </div>
          ) : (
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div
                className="card-header border-0 py-3"
                style={{ backgroundColor: "#00BCD4" }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4 className="text-white mb-0 px-2 fw-medium">
                    <i className="bi bi-clock-history me-2"></i>Order History
                  </h4>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={() =>
                        setSortOrder(
                          sortOrder === "newest" ? "oldest" : "newest"
                        )
                      }
                      className="btn btn-light btn-sm rounded-pill px-3"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <i className="bi bi-arrow-up-down me-1"></i>
                      {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                    </button>
                    <span className="badge bg-white text-dark rounded-pill px-3 py-2">
                      {sortedOrders.length} Orders
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="card-body p-0 overflow-auto custom-scrollbar"
                style={{ maxHeight: "600px" }}
              >
                <div className="p-3 p-md-4">
                  {sortedOrders.map((order) => {
                    // ✅ Get product info
                    let productImage = "https://via.placeholder.com/60";
                    let productName = "Product";
                    let productCount = 0;
                    
                    if (order.products && order.products.length > 0) {
                      productCount = order.products.length;
                      const firstProduct = order.products[0];
                      if (firstProduct.product) {
                        productImage = firstProduct.product.productImage || 
                                       firstProduct.product.image || 
                                       "https://via.placeholder.com/60";
                        productName = firstProduct.product.productName || 
                                     firstProduct.product.name || 
                                     "Product";
                      }
                    } else if (order.product) {
                      productCount = 1;
                      productImage = order.product.productImage || 
                                    order.product.image || 
                                    "https://via.placeholder.com/60";
                      productName = order.product.productName || 
                                   order.product.name || 
                                   "Product";
                    }
                    
                    return (
                      <Link
                        key={order._id}
                        to={`/order/${order._id}`}
                        className="text-decoration-none"
                      >
                        <div
                          className="order-item border-bottom pb-3 mb-3"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex gap-3 align-items-start">
                            <img
                              src={productImage}
                              alt={productName}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/60";
                              }}
                            />

                            <div className="flex-grow-1">
                              {order.products && order.products.length > 0 ? (
                                <>
                                  <h3 className="fw-bold mb-1 text-dark" style={{ fontSize: "1rem" }}>
                                    {order.products.length > 1
                                      ? `${productName} + ${order.products.length - 1} more`
                                      : productName}
                                  </h3>
                                  <div className="d-flex align-items-center gap-4 mb-1 flex-wrap">
                                    <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                      <strong>Items:</strong> {order.products.length}
                                    </span>
                                    <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                      <strong>Total:</strong> ₹{order.totalPrice?.toLocaleString() || 0}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <h3 className="fw-bold mb-1 text-dark" style={{ fontSize: "1rem" }}>
                                    {productName}
                                  </h3>
                                  <div className="d-flex align-items-center gap-4 mb-1 flex-wrap">
                                    <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                      <strong>Quantity:</strong> {order.quantity || 1}
                                    </span>
                                    <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                                      <strong>INR:</strong> ₹{order.totalPrice?.toLocaleString() || 0}
                                    </span>
                                  </div>
                                </>
                              )}

                              <div className="d-flex align-items-center gap-3 flex-wrap">
                                <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                                  <i className="bi bi-calendar3 me-1"></i>
                                  Order Placed on {formatDate(order.createdAt || order.date)}
                                </span>

                                <span
                                  className={`badge rounded-pill px-3 py-2 ${
                                    order.orderStatus === "Delivered"
                                      ? "bg-success-subtle text-success border border-success"
                                      : order.orderStatus === "Confirmed"
                                      ? "bg-primary-subtle text-primary border border-primary"
                                      : order.orderStatus === "Processing"
                                      ? "bg-info-subtle text-info border border-info"
                                      : order.orderStatus === "Shipped"
                                      ? "bg-secondary-subtle text-secondary border border-secondary"
                                      : order.orderStatus === "Placed" || order.orderStatus === "Pending"
                                      ? "bg-warning-subtle text-warning-emphasis border border-warning"
                                      : order.orderStatus === "Cancelled"
                                      ? "bg-danger-subtle text-danger border border-danger"
                                      : "bg-light-subtle text-dark border"
                                  }`}
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  {order.orderStatus || "Pending"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="card-footer bg-white border-0 py-3 text-center text-muted small">
                Showing {sortedOrders.length} orders in total
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style>{`
        .order-item {
          transition: all 0.2s ease;
        }
        .order-item:hover {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          margin: -10px 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c7cd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8b0b8;
        }
        .bg-success-subtle { background-color: #d4edda !important; }
        .bg-primary-subtle { background-color: #cce5ff !important; }
        .bg-info-subtle { background-color: #d1ecf1 !important; }
        .bg-warning-subtle { background-color: #fff3cd !important; }
        .bg-danger-subtle { background-color: #f8d7da !important; }
        .bg-secondary-subtle { background-color: #e2e3e5 !important; }
        .bg-light-subtle { background-color: #f8f9fa !important; }
        .border-success { border-color: #28a745 !important; }
        .border-primary { border-color: #007bff !important; }
        .border-info { border-color: #17a2b8 !important; }
        .border-warning { border-color: #ffc107 !important; }
        .border-danger { border-color: #dc3545 !important; }
        .border-secondary { border-color: #6c757d !important; }
      `}</style>
    </>
  );
};

export default Order;
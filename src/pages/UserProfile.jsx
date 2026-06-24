import { useContext, useState, useMemo } from "react";
import UserContext from "../useContext/User.jsx";
import Footer from "../components/Footer";
import OrderContext from "../useContext/Order.jsx";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";

const UserProfile = () => {
  const { orders } = useContext(OrderContext);
  const navigate = useNavigate();

  const {
    userDetails,
    deletedMessage,
    formHandler,
    handleDelete,
    handleEditClick,
    formSubmitted,
    setFormSubmitted,
    setDeletedMessage,
    address,
    setAddress,
    location,
    setLocation,
    editingAddressId,
    userAddress,
    setEditingAddressId,
  } = useContext(UserContext);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleCardClick = (orderId) => {
    navigate(`/order/${orderId}`); // ✅ Navigate to specific order details
  };

  const sortedOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const sorted = [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0);
      const dateB = new Date(b.createdAt || b.date || 0);

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return sorted;
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

  // ✅ Helper function to get product display info
  const getProductDisplayInfo = (order) => {
    // Handle products array (new structure)
    if (order.products && order.products.length > 0) {
      const firstProduct = order.products[0];
      const productName =
        firstProduct.product?.productName || firstProduct.name || "Product";

      // If multiple products, show count
      if (order.products.length > 1) {
        return {
          name: `${productName} + ${order.products.length - 1} more`,
          count: order.products.length,
          isMultiProduct: true,
        };
      }

      return {
        name: productName,
        count: 1,
        isMultiProduct: false,
      };
    }

    // Handle single product (old structure)
    if (order.product) {
      return {
        name:
          order.product.productName || order.product.name || "Order Details",
        count: 1,
        isMultiProduct: false,
      };
    }

    return {
      name: "Order Details",
      count: 0,
      isMultiProduct: false,
    };
  };

  return (
    <>
      <MainHeader/>
      <main className="container p-5">
        {/* User Profile Section */}
        <section className="profile-details-section mb-5">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">User Profile</h2>
            </div>
            <div className="card-body">
              {userDetails?.map((user) => (
                <div key={user._id}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>
                        <strong>Name:</strong> {user.name}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Phone Number:</strong> {user.number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order History Section - Simple List Style */}
        <section className="order-history-section mb-5">
          {sortedOrders.length === 0 ? (
            <div className="alert alert-info text-center shadow-sm">
              <i className="bi bi-inbox me-2"></i>
              No orders found. Start shopping now!
            </div>
          ) : (
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              {/* Header */}
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
                          sortOrder === "newest" ? "oldest" : "newest",
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

              {/* Fixed Height Container with Scroll */}
              <div
                className="card-body p-0 overflow-auto custom-scrollbar"
                style={{ maxHeight: "600px" }}
              >
                <div className="p-3 p-md-4">
                  {sortedOrders.map((order) => {
                    const productInfo = getProductDisplayInfo(order);

                    return (
                      <div
                        key={order._id}
                        className="order-item border-bottom pb-3 mb-3"
                        onClick={() => handleCardClick(order._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Product Name - Large Heading */}
                        <h3
                          className="fw-bold mb-1 text-dark"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {productInfo.name}
                          {productInfo.isMultiProduct && (
                            <span
                              className="badge bg-secondary ms-2"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {productInfo.count} items
                            </span>
                          )}
                        </h3>

                        {/* Quantity and Price */}
                        <div className="d-flex align-items-center gap-4 mb-1 flex-wrap">
                          <span
                            className="text-secondary"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <strong>Items:</strong> {productInfo.count}
                          </span>
                          <span
                            className="text-secondary"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <strong>Total:</strong> ₹
                            {order.totalPrice?.toLocaleString() || 0}
                          </span>
                        </div>

                        {/* Order Date and Status */}
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <i className="bi bi-calendar3 me-1"></i>
                            Order Placed on{" "}
                            {formatDate(order.createdAt || order.date)}
                          </span>

                          {/* Status Badge */}
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
                                      : order.orderStatus === "Placed" ||
                                          order.orderStatus === "Pending"
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

      {/* Custom CSS */}
      <style>{`
        .order-item {
          transition: all 0.2s ease;
          padding: 12px 0;
        }
        .order-item:last-child {
          border-bottom: none !important;
          margin-bottom: 0 !important;
        }
        .order-item:hover {
          background-color: #f8f9fa;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 8px;
          transform: translateX(5px);
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

export default UserProfile;

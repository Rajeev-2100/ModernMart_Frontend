import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import OrderContext from "../useContext/Order";
import Footer from "../components/Footer";
import OrderDetailHeader from "../components/OrderDetailHeader";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { selectedOrder, loading, handleOrderDataByOrderId, orders } =
    useContext(OrderContext);

  // Get order data from selectedOrder or find from orders array
  const order = selectedOrder || orders?.find((o) => o._id === orderId);

  useEffect(() => {
    if (orderId) {
      handleOrderDataByOrderId(orderId);
    }
  }, [orderId]);

  // Format date function
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

  // Format full date with time
  const formatFullDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // ✅ Get items from order (supports both products array and single product)
  const getOrderItems = () => {
    // ✅ New structure: products array
    if (order?.products && order.products.length > 0) {
      return order.products.map((item) => ({
        ...item.product,
        quantity: item.quantity,
        price: item.price || item.product?.productPrice || 0,
        _id: item.product?._id || item._id,
      }));
    }
    // ✅ Old structure: single product
    else if (order?.product) {
      return [
        {
          ...order.product,
          quantity: order.quantity || 1,
          price: order.product.productPrice || order.product.price || 0,
        },
      ];
    }
    return [];
  };

  const orderItems = getOrderItems();

  // Calculate total price
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const price = item.price || item.productPrice || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const totalPrice = calculateTotal() || order?.totalPrice || 0;

  // Calculate delivery charges (example logic)
  const deliveryCharges = totalPrice > 500 ? 0 : 199;
  const finalTotal = totalPrice + deliveryCharges;

  if (loading) {
    return (
      <>
        <OrderDetailHeader />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading order details...</h5>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <OrderDetailHeader />
        <div className="container py-5 text-center">
          <h4>Order not found</h4>
          <Link to="/order" className="btn btn-primary mt-3 rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i>Back to Orders
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  console.log("Order Items:", orderItems);

  return (
    <>
      <OrderDetailHeader />

      <main className="container py-4">
        <div className="mb-4">
          <Link
            to="/order"
            className="btn btn-outline-secondary rounded-pill px-4"
          >
            <i className="bi bi-arrow-left me-2"></i>Back to Orders
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold">
            <i className="bi bi-box me-2"></i>Order Details
          </h2>
          <span
            className={`badge rounded-pill px-4 py-2 ${
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
            style={{ fontSize: "0.9rem" }}
          >
            {order.orderStatus || "Pending"}
          </span>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <i className="bi bi-bag me-2"></i>Order Items (
                  {orderItems.length})
                </h4>

                {orderItems.map(
                  (item, index) => (
                    console.log(item),
                    (
                      <div
                        key={item._id || index}
                        className={`py-3 ${
                          index !== orderItems.length - 1 ? "border-bottom" : ""
                        }`}
                      >
                        <div
                          className="d-flex justify-content-between gap-3 align-items-start"
                          style={{ width: "90%" }}
                        >
                          {/* Product Image */}
                          <div>
                            <img
                              src={
                                item.productImage ||
                                "https://via.placeholder.com/80"
                              }
                              alt={item.productName || "Product"}
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/80";
                              }}
                            />
                          </div>

                          <div className="flex-grow-1">
                            <h5 className="fw-bold mb-2">
                              {item.productName || item.title || "Product Name"}
                            </h5>

                            <div className="d-flex flex-wrap gap-3 mb-2">
                              {(item.author || item.productAuthor) && (
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "0.85rem" }}
                                >
                                  <i className="bi bi-person me-1"></i>
                                  {item.author || item.productAuthor}
                                </span>
                              )}

                              {(item.category || item.productCategory) && (
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "0.85rem" }}
                                >
                                  <i className="bi bi-tags me-1"></i>
                                  {item.category || item.productCategory}
                                </span>
                              )}

                              <span
                                className="text-muted"
                                style={{ fontSize: "0.85rem" }}
                              >
                                <i className="bi bi-box-seam me-1"></i>
                                Qty: {item.quantity || 1}
                              </span>

                              <span
                                className="fw-bold text-success"
                                style={{ fontSize: "0.95rem" }}
                              >
                                <i className="bi bi-currency-rupee me-1"></i>₹
                                {(
                                  (item.price || item.productPrice || 0) *
                                  (item.quantity || 1)
                                ).toLocaleString()}
                              </span>

                              {item.rating && (
                                <span
                                  className="text-warning"
                                  style={{ fontSize: "0.85rem" }}
                                >
                                  <i className="bi bi-star-fill me-1"></i>
                                  {item.rating} / 5
                                </span>
                              )}
                            </div>

                            {item.size && (
                              <span
                                className=""
                                style={{ fontSize: "0.85 rem" }}
                              >
                                <b>Size: </b>
                                {item.size}
                              </span>
                            )}
                            {/* ✅ Product Description - Moved outside the flex container */}
                            {(item.productDescription || item.description) && (
                              <div className="mt-2">
                                <small className="text-muted d-block">
                                  <strong>Description:</strong>{" "}
                                  {Array.isArray(item.productDescription)
                                    ? item.productDescription.join(", ")
                                    : item.productDescription ||
                                      item.description}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  ),
                )}

                <div className="mt-3 pt-3 border-top">
                  <p
                    className="text-secondary mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <i className="bi bi-calendar3 me-2"></i>
                    Order Placed on{" "}
                    {formatFullDate(order.createdAt || order.date)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-truck me-2"></i>Delivery Details
                </h5>
                <p className="fw-semibold mb-1">
                  {order.address?.name || order.user?.name || "Customer"}
                </p>
                <p className="text-secondary mb-0">
                  {order.address?.address || "N/A"}
                  {order.address?.location && `, ${order.address.location}`}
                  {order.address?.city && `, ${order.address.city}`}
                  {order.address?.state && `, ${order.address.state}`}
                  {order.address?.pincode && ` - ${order.address.pincode}`}
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-currency-rupee me-2"></i>Price Details
                </h5>

                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-secondary">Price</span>
                  <span className="fw-semibold">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-secondary">Delivery Charges</span>
                  <span className="fw-semibold">
                    {deliveryCharges === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `₹${deliveryCharges}`
                    )}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between py-2">
                  <span className="fw-bold">Total Price</span>
                  <span
                    className="fw-bold text-success"
                    style={{ fontSize: "1.2rem" }}
                  >
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-info-circle me-2"></i>Order Summary
                </h5>
                <div className="mb-2">
                  <span
                    className="text-muted d-block"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-upc-scan me-1"></i>Order ID
                  </span>
                  <span
                    className="fw-semibold"
                    style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                  >
                    {order._id}
                  </span>
                </div>
                <div className="mb-2">
                  <span
                    className="text-muted d-block"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-calendar3 me-1"></i>Order Date
                  </span>
                  <span className="fw-semibold">
                    {formatDate(order.createdAt || order.date)}
                  </span>
                </div>
                <div>
                  <span
                    className="text-muted d-block"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-credit-card me-1"></i>Payment Method
                  </span>
                  <span className="fw-semibold">
                    {order.paymentMethod || "Online Payment"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
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

export default OrderDetails;

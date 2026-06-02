import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import OrderContext from "../useContext/Order";
import Footer from "../components/Footer";
import OrderDetailHeader from "../components/OrderDetailHeader";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { selectedOrder, loading, handleOrderDataByOrderId } =
    useContext(OrderContext);

  const order = selectedOrder?.data

  useEffect(() => {
    handleOrderDataByOrderId(orderId);
  }, [orderId]);

  if (loading) {
    return (
      <>
        <OrderDetailHeader />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary mb-3" />
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
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <OrderDetailHeader />

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Order Details</h2>
          <span className="badge bg-success px-3 py-2">
            {order.orderStatus}
          </span>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <p className="text-muted mb-1">Order ID</p>
                <p className="fw-semibold">{order._id}</p>
              </div>
              <div className="col-md-4">
                <p className="text-muted mb-1">Order Date</p>
                <p className="fw-semibold">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="col-md-4">
                <p className="text-muted mb-1">Total Amount</p>
                <p className="fw-bold text-success fs-5">
                  ₹{order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Customer Details</h5>
                <p className="mb-1"><b>Name:</b> {order.user?.name}</p>
                <p className="mb-1"><b>Email:</b> {order.user?.email}</p>
                <p className="mb-0"><b>Phone:</b> {order.user?.number}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Delivery Address</h5>
                <p className="mb-0">
                  {order.address?.address}, {order.address?.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Product Details</h5>

            <div className="d-flex gap-4 align-items-start">
              <img
                src={order.product?.productImage}
                alt={order.product?.productName}
                width="140"
                className="rounded border"
              />

              <div>
                <h5 className="mb-1">
                  {order.product?.productName}
                </h5>
                <p className="mb-1 text-muted">
                  Size: {order.product?.size}
                </p>
                <p className="mb-1">
                  Price: ₹{order.product?.productPrice}
                </p>
                <p className="mb-1">
                  Quantity: {order.quantity}
                </p>
                <p className="mb-0">
                  Rating: {order.product?.rating}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderDetail;

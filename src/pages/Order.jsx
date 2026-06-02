import OrderHeader from "../components/OrderHeader";
import Footer from "../components/Footer";
import { useContext } from "react";
import OrderContext from "../useContext/Order";
import { Link } from "react-router-dom";

const Order = () => {
  const { orders, ordersLoaded, handleAllOrderData } = useContext(OrderContext);

  if (!ordersLoaded) {
    handleAllOrderData();
  }

  return (
    <>
      <OrderHeader />
      <main className="container py-4 py-lg-5">
        <h3 className="mb-4 fw-bold">My Orders</h3>
        <button
          className="btn btn-outline-primary mb-4"
          onClick={handleAllOrderData}
        >
          Reload Orders
        </button>

        {orders.length === 0 ? (
          <div className="alert alert-info text-center">No orders found</div>
        ) : (
          <div className="row g-3">
            {orders.map((order) => (
              <div key={order._id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                    <div className="d-flex flex-column align-items-center">
                      <small className="text-muted mb-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>

                      <img
                        src={order.product.productImage}
                        alt={order.product.productName}
                        className="rounded img-fluid"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="text-center text-md-start">
                      <h6 className="mb-1">{order.product.productName}</h6>

                      <small>Quantity: {order.quantity}</small>
                    </div>

                    <div className="text-center text-md-end">
                      <div className="fw-bold">
                        ₹{order.totalPrice.toFixed(2)}
                      </div>

                      <small className="text-muted">{order.orderStatus}</small>
                    </div>

                    <div>
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/order/${order._id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Order;

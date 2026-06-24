import { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContext from "../useContext/Cart";
import UserContext from "../useContext/User";
import OrderContext from "../useContext/Order";
import { toast } from "react-toastify";

const Checkout = () => {
  const { handlePayment, loading } = useContext(OrderContext);

  const {
    userDetails,
    userAddress,
    updateUserAddress,
    deletedUserAddress,
    formSubmitted,
    formHandler,
    address,
    setAddress,
    location,
    setLocation,
  } = useContext(UserContext);

  const { cart, deleteAllCart } = useContext(CartContext);

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // ✅ In Checkout.js - placeOrderFromCart function
  const placeOrderFromCart = async () => {
    if (!selectedAddressId) {
      toast.warning("Please select a delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    if (!userDetails || userDetails.length === 0) {
      toast.error("User details not found");
      return;
    }

    try {
      // ✅ Prepare products array
      const products = cart.map((item) => ({
        productId: item.product._id,
        quantity: item.productQuantity,
        price: item.product.productPrice,
      }));

      // ✅ Calculate total
      // ❌ Issue: Client-side price calculation only
      const subtotal = cart.reduce(
        (acc, curr) => acc + curr.product.productPrice * curr.productQuantity,
        0,
      );
      const totalPrice = subtotal + DELIVERY_CHARGES;

      // ✅ Prepare order data
      const orderData = {
        products: products,
        user: userDetails[0]._id,
        address: selectedAddressId,
        totalPrice: totalPrice,
        orderStatus: "Placed",
      };

      console.log("📤 Order Data:", orderData);

      // ✅ Call handlePayment
      const result = await handlePayment(orderData);

      console.log("✅ Order Result:", result);

      if (result) {
        await deleteAllCart();
        toast.success("Order placed successfully! 🎉");
      }
    } catch (error) {
      console.error("❌ Order placement error:", error);
      toast.error(error.message || "Failed to place order");
    }
  };

  const handleEditClick = (addr) => {
    setAddress(addr.address);
    setLocation(addr.location);
    setEditingAddressId(addr._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingAddressId) return;

    await updateUserAddress(editingAddressId, {
      address,
      location,
    });

    setEditingAddressId(null);
    setAddress("");
    setLocation("");
    toast.success("Address updated successfully!");
  };


  const handleDelete = (id) => {
    deletedUserAddress(id);
    if (selectedAddressId === id) {
      // Auto-select next available address
      const remainingAddresses = userAddress.filter((addr) => addr._id !== id);
      setSelectedAddressId(
        remainingAddresses.length > 0 ? remainingAddresses[0]._id : null,
      );
    }
    toast.success("Address deleted successfully!");
  };

  const DELIVERY_CHARGES = 125;

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.product.productPrice * curr.productQuantity,
    0,
  );

  const totalPrice = subtotal + DELIVERY_CHARGES;

  return (
    <>
      <Header />

      <main className="container py-5 ">
        <h2 className="mb-4 fw-bold text-center">Checkout</h2>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">User Information</h5>
                {userDetails?.map((user) => (
                  <div key={user._id}>
                    <p className="mb-1">
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="mb-0">
                      <strong>Phone:</strong> {user.number}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Order Items</h5>

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <div>
                      <p className="mb-0 fw-semibold">
                        {item.product.productName}
                      </p>
                      <small className="text-muted">
                        Qty: {item.productQuantity}
                      </small>
                    </div>
                    <p className="mb-0 fw-semibold">
                      ₹{item.product.productPrice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  {editingAddressId ? "Update Address" : "Add New Address"}
                </h5>

                <form onSubmit={editingAddressId ? handleUpdate : formHandler}>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-primary">
                      {editingAddressId ? "Update Address" : "Save Address"}
                    </button>

                    {editingAddressId && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingAddressId(null);
                          setAddress("");
                          setLocation("");
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {formSubmitted && (
                  <div className="alert alert-success mt-3">
                    {formSubmitted}
                  </div>
                )}
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Delivery Address</h5>

                {userAddress.length === 0 ? (
                  <p className="text-muted">
                    No addresses saved. Please add one.
                  </p>
                ) : (
                  userAddress.map((addr) => (
                    <div key={addr._id} className="border rounded p-3 mb-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2">
                          <input
                            type="radio"
                            checked={selectedAddressId === addr._id}
                            onChange={() => setSelectedAddressId(addr._id)}
                          />

                          <div>
                            <p className="mb-1 fw-semibold">{addr.address}</p>
                            <small className="text-muted">
                              {addr.location}
                            </small>
                          </div>
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            style={{ width: "120px", height: "38px" }}
                            onClick={() => handleEditClick(addr)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            style={{ width: "120px", height: "38px" }}
                            onClick={() => handleDelete(addr._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "100px" }}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <span>₹{DELIVERY_CHARGES}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                {!selectedAddressId && (
                  <div className="alert alert-warning text-center py-2">
                    Please select a delivery address
                  </div>
                )}

                {selectedAddressId && cart.length > 0 && (
                  <button
                    className="btn btn-success w-100"
                    onClick={placeOrderFromCart}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;

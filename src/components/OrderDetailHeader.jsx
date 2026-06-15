import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../useContext/Cart";
import ProductContext from "../useContext/product";

const OrderDetailHeader = () => {
  const [search, setSearch] = useState("");
  const { setSearchTerm } = useContext(ProductContext);

  const {
    cart,
    wishList,
    cartLoaded,
    wishListLoaded,
    getAllCartDetail,
    getAllWishListDetail,
  } = useContext(CartContext);

  useEffect(() => {
    if (!cartLoaded) {
      getAllCartDetail;
    }
  }, [cartLoaded, getAllCartDetail]);

  useEffect(() => {
    if (!wishListLoaded) {
      getAllWishListDetail();
    }
  }, [wishListLoaded, getAllWishListDetail]);

  return (
    <header className="bg-body-tertiary shadow-sm px-4 px-lg-0">
      <nav className="navbar navbar-expand-lg container">
        <Link className="navbar-brand fw-bold" to="/">
          <h2><b>Modern Mart</b></h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="d-flex flex-row flex-lg-row align-items-end align-items-lg-center gap-3 ms-lg-3">
            <Link to={`/userProfile`}>
              <i className="bi bi-person fs-4 text-dark"></i>
            </Link>

            <Link
              to={`/wishList`}
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i
                className={`bi bi-heart fs-4 ${
                  wishList.length > 0 ? "text-danger" : "text-dark"
                }`}
              ></i>
              ({wishList.length})
            </Link>

            <Link
              to={`/cart`}
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-cart fs-4"></i>
              <span className="d-lg-inline d-none">Cart</span>({cart.length})
            </Link>

            <Link
              to={`/order`}
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-box-fill fs-4"></i>
              <span className="d-lg-inline d-none">Order</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default OrderDetailHeader;

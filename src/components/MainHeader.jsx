import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import CartContext from "../useContext/Cart";
import ProductContext from "../useContext/product";

const MainHeader = () => {
  const navigate = useNavigate();
  const { cartItems, wishlistItems } = useContext(CartContext);
  const { setSearchTerm } = useContext(ProductContext);
  const [searchInput, setSearchInput] = useState("");

  const totalCartItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTerm(searchInput);
      navigate("/productPage");
      setSearchInput("");
    }
  };

  return (
    <header className="bg-body-tertiary shadow-sm px-4 px-lg-0">
      <nav className="navbar navbar-expand-lg container">
        <Link className="navbar-brand fw-bold" to="/">
          <h2>
            <b>Modern Mart</b>
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="d-flex flex-row flex-lg-row align-items-end align-items-lg-center gap-3 ms-lg-3">
            <Link
              to="/productPage"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-grid-3x3-gap-fill fs-4"></i>
              <span className="d-lg-inline d-none">Products</span>
            </Link>

            <Link
              to="/wishList"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i
                className={`bi bi-heart fs-4 ${
                  wishlistItems?.length > 0 ? "text-danger" : "text-dark"
                }`}
              ></i>
              ({wishlistItems?.length || 0})
            </Link>

            <Link
              to="/cart"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-cart fs-4"></i>
              <span className="d-lg-inline d-none">Cart</span>({totalCartItems || 0})
            </Link>

            <Link
              to="/order"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-box-fill fs-4"></i>
              <span className="d-lg-inline d-none">Order</span>
            </Link>

            <Link
              to="/userProfile"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <i className="bi bi-person-circle fs-4"></i>
              <span className="d-lg-inline d-none">User</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
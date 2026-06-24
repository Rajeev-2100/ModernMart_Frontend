import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useState, useEffect } from "react";
import ProductContext from "../useContext/product";
import CartContext from "../useContext/Cart";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const { getCategory, categoryData } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    if (categoryName) {
      getCategory(categoryName);
    }
  }, [categoryName]);

  const handleAddToCart = (product) => {
    const size = selectedSizes[product._id];

    if (!size) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    addToCart(product, size);
    setAddedProductId(product._id);
    toast.success(`${product.productName} added to cart!`);

    setSelectedSizes((prev) => ({
      ...prev,
      [product._id]: "",
    }));

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1 bg-light py-5">
          {/* Category Header Section */}
          <div className="container-lg mb-5">
            <div className="bg-white p-3 rounded-3 shadow-sm border-start border-5 border-primary">
              <button
                className="btn btn-link text-primary text-decoration-none fw-bold mb-3 p-0"
                onClick={() => navigate("/")}
              >
                ← Back to Home
              </button>
              <h1 className="display-6 fw-bold m-0 text-dark ">{categoryName}</h1>
              <p className="text-muted fs-6">
                Explore our exclusive {categoryName?.toLowerCase()} products
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="container-lg">
            {categoryData.length === 0 ? (
              <div className="text-center py-5 bg-white rounded">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted fs-6">Loading products...</p>
              </div>
            ) : (
              <div className="row g-4">
                {categoryData.map((product) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={product._id}>
                    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                      {/* Product Image Container */}
                      <div
                        className="position-relative bg-light"
                        style={{
                          height: "250px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.productImage}
                          className="w-100 h-100"
                          alt={product.productName}
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Card Body */}
                      <div className="card-body d-flex flex-column pt-4 pb-4">
                        {/* Product Name */}
                        <h5 className="card-title fw-bold text-dark mb-2 lh-base">
                          {product.productName}
                        </h5>

                        {/* Product Price */}
                        <p className="card-text text-primary fw-bold fs-5 mb-4">
                          <span className="text-dark">Product Price:</span> ${product.productPrice}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-4 flex-shrink-0">
                          <label className="form-label fw-bold small text-uppercase text-muted mb-2 d-block">
                            Select Size
                          </label>
                          <select
                            value={selectedSizes[product._id] || ""}
                            className="form-select form-select-sm"
                            onChange={(e) =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product._id]: e.target.value,
                              }))
                            }
                            aria-label="Select product size"
                          >
                            <option value="">Choose size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-grid gap-2">
                          <button
                            className={`btn fw-bold py-2 ${
                              addedProductId === product._id
                                ? "btn-success"
                                : "btn-primary"
                            }`}
                            onClick={() => handleAddToCart(product)}
                            aria-label="Add product to cart"
                          >
                            {addedProductId === product._id
                              ? "✓ Added to Cart"
                              : "Add to Cart"}
                          </button>

                          <Link
                            to={`/productPage/${product._id}`}
                            className="btn btn-outline-primary fw-bold py-2 text-decoration-none"
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
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
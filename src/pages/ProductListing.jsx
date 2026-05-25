import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useContext, useState } from "react";
import CartContext from "../useContext/Cart.jsx";
import ProductContext from "../useContext/product.jsx";
import { toast } from "react-toastify";

const ProductListing = () => {
  const [addedProductId, setAddedProductId] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});

  const { categoryName } = useParams();

  const {
    setSearchTerm,
    price,
    categories,
    setCategories,
    setRating,
    setPrice,
    setSortBy,
    rating,
    sortBy,
    loading,
    error,
    sortedProducts,
  } = useContext(ProductContext);

  const { addToCart, addToWishList } = useContext(CartContext);

  const finalProducts = categoryName
    ? sortedProducts.filter(
        (product) => product.categoryField?.categoryField === categoryName,
      )
    : sortedProducts;

  if (error) {
    return (
      <>
        <Header />
        <p className="text-center text-danger mt-5">
          {error.message}
        </p>
        <Footer />
      </>
    );
  }

  const removeCategory = (cateRemove) => {
    setCategories(categories.filter((cate) => cate !== cateRemove));
  };

  const removePrice = () => {
    setPrice("");
  };

  const removeRating = () => {
    setRating(0);
  };

  const hasActiveFilters = () => {
    return (
      price !== "" ||
      categories.length > 0 ||
      rating > 0
    );
  };

  const handleCategoryChange = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(
        categories.filter((item) => item !== value),
      );
    }
  };

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />

      <main className="container py-5">
        {loading && (
          <p className="text-center">Loading...</p>
        )}

        <div
          className="d-flex flex-column flex-md-row gap-4"
          style={{ minHeight: "80vh" }}
        >
          <div
            className="d-flex flex-column align-items-start bg-light p-3 rounded shadow-sm"
            style={{
              minWidth: "260px",
              width: "260px",
              height: "fit-content",
            }}
          >
            <h4 className="mb-4">
              <b>Filter Products</b>
            </h4>

            <div className="mb-4 w-100">
              <h5>Price:</h5>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price50"
                  checked={price === 50}
                  onChange={() => setPrice(50)}
                />
                <label
                  className="form-check-label"
                  htmlFor="price50"
                >
                  $50 & below
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price150"
                  checked={price === 150}
                  onChange={() => setPrice(150)}
                />
                <label
                  className="form-check-label"
                  htmlFor="price150"
                >
                  $150 & below
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="price"
                  id="price200"
                  checked={price === 200}
                  onChange={() => setPrice(200)}
                />
                <label
                  className="form-check-label"
                  htmlFor="price200"
                >
                  $200 & below
                </label>
              </div>
            </div>

            <div className="mb-4 w-100">
              <h5>Category:</h5>

              {[
                "Women",
                "Men",
                "Child",
                "Men Sport",
                "Women Sport",
              ].map((category) => (
                <div
                  className="form-check"
                  key={category}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                  />

                  <label
                    className="form-check-label"
                    htmlFor={category}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4 w-100">
              <h5>Rating:</h5>

              {[4.8, 4.6, 4.4, 4.2].map((rate) => (
                <div
                  className="form-check"
                  key={rate}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    id={`rating${rate}`}
                    checked={rating === rate}
                    onChange={() => setRating(rate)}
                  />

                  <label
                    className="form-check-label"
                    htmlFor={`rating${rate}`}
                  >
                    {rate} Stars & above
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4 w-100">
              <h5>Sort By</h5>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  id="lowToHigh"
                  checked={sortBy === "LOW_TO_HIGH"}
                  onChange={() =>
                    setSortBy("LOW_TO_HIGH")
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="lowToHigh"
                >
                  Price - Low to High
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  id="highToLow"
                  checked={sortBy === "HIGH_TO_LOW"}
                  onChange={() =>
                    setSortBy("HIGH_TO_LOW")
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="highToLow"
                >
                  Price - High To Low
                </label>
              </div>
            </div>

            <button
              className="btn btn-outline-dark w-100"
              onClick={() => {
                setPrice("");
                setCategories([]);
                setRating(0);
                setSortBy("");
              }}
            >
              Clear Filters
            </button>
          </div>

          <div className="flex-grow-1">
            {hasActiveFilters() && (
              <div className="mb-4">
                <h5>
                  <strong>Active Filters:</strong>
                </h5>

                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="badge bg-dark me-2 mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      removeCategory(cat)
                    }
                  >
                    {cat} ✖
                  </span>
                ))}

                {price !== "" && (
                  <span
                    className="badge bg-dark me-2 mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={removePrice}
                  >
                    ${price} & below ✖
                  </span>
                )}

                {rating > 0 && (
                  <span
                    className="badge bg-dark me-2 mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={removeRating}
                  >
                    {rating}+ ✖
                  </span>
                )}
              </div>
            )}

            <h5 className="mb-4">
              Show All Products (
              {finalProducts?.length || 0} Products)
            </h5>

            <div className="d-flex flex-wrap gap-4">
              {finalProducts?.map((product) => (
                <div
                  key={product._id}
                  className="card p-3 shadow-sm"
                  style={{
                    width: "18rem",
                    maxWidth: "100%",
                  }}
                >
                  <div className="position-relative">
                    <i
                      className="bi bi-heart-fill text-danger fs-3 position-absolute top-0 end-0 m-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          !selectedSize[product._id]
                        ) {
                          toast(
                            "Please Select The Size",
                          );
                          return;
                        }

                        addToWishList(
                          product,
                          selectedSize[
                            product._id
                          ],
                        );

                        setAddedProductId(
                          product._id,
                        );
                      }}
                    ></i>

                    <img
                      src={product.productImage}
                      className="card-img-top img-fluid object-fit-cover"
                      alt={product.productName}
                      style={{ height: "250px" }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">
                      {product.productName}
                    </h5>

                    <div className="d-flex justify-content-between mb-3">
                      <h6>
                        $
                        {product.productPrice}
                      </h6>

                      <h6>
                        ⭐ {product.rating}
                      </h6>
                    </div>

                    {/* Size */}
                    <select
                      value={
                        selectedSize[
                          product._id
                        ] || ""
                      }
                      className="form-select mb-3"
                      onChange={(e) =>
                        setSelectedSize({
                          ...selectedSize,
                          [product._id]:
                            e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select Size
                      </option>
                      <option value="S">
                        S
                      </option>
                      <option value="M">
                        M
                      </option>
                      <option value="L">
                        L
                      </option>
                      <option value="XL">
                        XL
                      </option>
                      <option value="XXL">
                        XXL
                      </option>
                    </select>

                    <div className="d-flex flex-column gap-2 mt-auto">
                      <Link
                        to={
                          addedProductId ===
                          product._id
                            ? "/cart"
                            : "#"
                        }
                        className="btn btn-primary"
                        onClick={(e) => {
                          const size =
                            selectedSize[
                              product._id
                            ];

                          if (!size) {
                            e.preventDefault();

                            toast(
                              "Please Select The Size",
                            );

                            return;
                          }

                          if (
                            addedProductId !==
                            product._id
                          ) {
                            e.preventDefault();

                            addToCart(
                              product,
                              size,
                            );

                            setAddedProductId(
                              product._id,
                            );
                          }
                        }}
                      >
                        {addedProductId ===
                        product._id
                          ? "Go To Cart"
                          : "Add To Cart"}
                      </Link>

                      <Link
                        to={`/productPage/${product._id}`}
                        className="btn btn-outline-primary"
                      >
                        More Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductListing;
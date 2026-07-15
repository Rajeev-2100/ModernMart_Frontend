import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MainHeader from "./components/MainHeader";
import ProductContext from "./useContext/product";

function App() {
  const { sortedProducts, loading, error } = useContext(ProductContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [imageHeight, setImageHeight] = useState("400px");
  const [displayCategory, setDisplayCategory] = useState("400px");

  useEffect(() => {
    const handleResize = () => {
      setImageHeight(window.innerWidth < 768 ? "220px" : "500px");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDisplayCategory(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[])

  useEffect(() => {
    if (sortedProducts && sortedProducts.length > 0) {
      const topProducts = [...sortedProducts]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setBestSellerProducts(topProducts);
    }
  }, [sortedProducts]);

  return (
    <>
      <MainHeader />
      <main className="container py-5">
        <section className="mb-3">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="https://images.unsplash.com/photo-1760024678775-2410218abad4?q=80&w=2180&auto=format&fit=crop"
                    alt="Carousel"
                    className="img-fluid w-100"
                    style={{
                      height: imageHeight,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661422061155-b78d4a75f667?q=80&w=2180&h=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Carousel"
                    className="img-fluid w-100"
                    style={{
                      height: imageHeight,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="https://images.unsplash.com/photo-1775574222563-22a713da3f4f?q=80&w=2180&h=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Carousel"
                    className="img-fluid w-100"
                    style={{
                      height: imageHeight,
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <section className="mb-5">
          <h2 className="text-center py-5">Shop by Category</h2>
          <div
            className={`d-flex flex-row flex-wrap gap-4 ${
              displayCategory ? "justify-content-center" : "justify-content-between"
            }`}
          >
            <div className="d-flex align-items-center flex-column">
              <Link to={`/category/Women`}>
                <img
                  src="https://img.freepik.com/free-photo/happy-young-woman-uses-her-phone-posing-with-colorful-shopping-bags-studio_8353-5606.jpg"
                  className="img-fluid"
                  alt="women"
                  width="410"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>
              <h4 className="mt-2">Women</h4>
            </div>
            <div className="d-flex align-items-center flex-column">
              <Link to={`/category/Men`}>
                <img
                  src="https://img.freepik.com/premium-photo/online-home-shopping-time-portrait-young-bearded-man-sitting-floor-with-mobile-phone-with-crossed-legs-with-shopping-bags_255757-7840.jpg"
                  className="img-fluid"
                  alt="men"
                  width="410"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>
              <h4 className="mt-2">Men</h4>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Link to={`/category/Women Sport`}>
                <img
                  src="https://images.unsplash.com/photo-1518310383802-640c2de311b2"
                  className="img-fluid"
                  alt="women sports wear"
                  width="410"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>
              <h4 className="mt-2">Women Sports</h4>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Link to={`/category/Men Sport`}>
                <img
                  src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51"
                  className="img-fluid"
                  alt="men sports wear"
                  width="410"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>
              <h4 className="mt-2">Men Sports</h4>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Link to={`/category/Child`}>
                <img
                  src="https://images.pexels.com/photos/8471820/pexels-photo-8471820.jpeg"
                  className="img-fluid"
                  alt="kids clothing"
                  width="410"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Link>
              <h4 className="mt-2">Child Clothes</h4>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <i className="bi bi-star-fill text-warning me-2"></i>
              Best Seller Products
            </h2>
            <Link to="/productPage" className="btn btn-primary">
              View All Products <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading best sellers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <p className="text-danger">Error loading products</p>
            </div>
          ) : bestSellerProducts.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No best seller products available</p>
            </div>
          ) : (
            <div className="row g-4">
              {bestSellerProducts.map((product) => (
                <div
                  key={product._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100 shadow-sm border-0">
                    <div className="position-relative">
                      <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-3 py-2">
                        <i className="bi bi-star-fill me-1"></i>
                        Best Seller
                      </span>
                      <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                        {product.rating} ⭐
                      </span>
                      <img
                        src={product.productImage}
                        className="card-img-top"
                        alt={product.productName}
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-truncate">
                        {product.productName}
                      </h5>
                      <p className="card-text text-primary fw-bold fs-5">
                        ${product.productPrice}
                      </p>
                      <p className="card-text text-muted small">
                        <i className="bi bi-tag me-1"></i>
                        {product.categoryField?.categoryField ||
                          "Uncategorized"}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/productPage/${product._id}`}
                          className="btn btn-primary w-100"
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
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

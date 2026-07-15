import { useParams, Link } from "react-router";
import useFetch from "../useFetch";
import Footer from "../components/Footer";
import { useState } from "react";
import MainHeader from "../components/MainHeader";

export const productMRP = (productData) => {
  const [quantity, setQuantity] = useState(1);
  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = productData ? productData.productPrice * quantity : 0;

  return { increaseQty, decreaseQty, totalPrice, quantity };
};

const ProductDetail = () => {
  const { productId } = useParams();

  const { data, loading, error } = useFetch(
    `https://modern-mart-backend.vercel.app/api/products/${productId}`,
  );

  const productData = data?.data;
  const { increaseQty, decreaseQty, totalPrice, quantity } =
    productMRP(productData);

  return (
    <>
      <style>{`
        .pd-image-box {
          background: #f7f7f8;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .pd-image-box img {
          max-width: 100%;
          max-height: 420px;
          object-fit: contain;
        }

        .pd-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #fff8e1;
          color: #946c00;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
        }

        .pd-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .pd-discount {
          font-weight: 600;
          color: #1aa15a;
        }

        .pd-qty-box {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid #d8d8d8;
          border-radius: 999px;
          padding: 0.4rem 1rem;
        }

        .pd-qty-box i {
          font-size: 1.3rem;
          cursor: pointer;
        }

        .pd-qty-box span {
          font-weight: 600;
          min-width: 1.5rem;
          text-align: center;
        }

        @media (max-width: 991.98px) {
          .pd-image-box {
            padding: 1.25rem;
          }
        }
      `}</style>

      <div className="d-flex flex-column min-vh-100">
        <MainHeader />

        <main className="container py-5 flex-grow-1">
          {loading && <p className="text-center">Loading...</p>}

          {error && <p className="text-danger text-center">{error.message}</p>}

          {!loading && !error && productData && (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="pd-image-box">
                  <img
                    src={productData?.productImage}
                    alt={productData?.productName}
                  />
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <Link to="/checkOut" className="btn btn-primary px-5 py-2">
                    Buy Now
                  </Link>
                </div>
              </div>

              <div className="col-lg-6">
                <h2 className="fw-semibold mb-3">
                  <b>Product Name: </b> {productData?.productName}
                </h2>

                <div className="pd-rating-badge mb-3">
                  <i className="bi bi-star-fill"></i>
                  <b>Rating: </b>
                  {productData?.rating}
                </div>

                <div className="d-flex align-items-baseline gap-3 mb-3">
                  <span className="pd-price">
                    <b className="fw-medium">Product Price: </b>$
                    {productData?.productPrice}
                  </span>
                </div>
                <p>
                  <b className="fw-bold">Product Discount: </b>
                  {productData?.discountPrice ? (
                    <span className="pd-discount">
                      {productData.discountPrice}% off
                    </span>
                  ) : null}
                </p>

                {productData?.size && (
                  <p className="mb-3">
                    <b className="fw-bold">Size: </b>
                    {productData.size}
                  </p>
                )}

                <div className="">
                  <p><b>Product Quantity: </b></p>
                  <div className="mb-3">
                  <div className="pd-qty-box">
                    <i
                      className="bi bi-dash-circle-fill"
                      onClick={decreaseQty}
                    ></i>
                    <span>{quantity}</span>
                    <i
                      className="bi bi-plus-circle-fill"
                      onClick={increaseQty}
                    ></i>
                  </div>
                </div>
                </div>

                <h4 className="mb-4">Total Price: ${totalPrice}</h4>

                <hr />

                <p className="mb-0">
                  <b className="fw-bold">Description:</b>
                  <br />
                  {productData?.productDescription?.length
                    ? productData.productDescription.join(", ")
                    : "No description available."}
                </p>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;

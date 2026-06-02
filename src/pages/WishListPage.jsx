import { useContext, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import CartContext from "../useContext/Cart";
import { toast } from "react-toastify";
import WishlistHeader from "../components/WishlistHeader";

const WishListPage = () => {
  const [addedProductId, setAddedProductId] = useState(null);
  const [removedId, setRemovedId] = useState(null);

  const {
    wishList,
    wishListLoaded,
    getAllWishListDetail,
    removeToWishlist,
    addToCart,
  } = useContext(CartContext);

  if (!wishListLoaded) {
    getAllWishListDetail();
  }
  // console.log('Remove Id:', removedId)

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <WishlistHeader />
        <main className="container py-5 flex-grow-1">
          <h4 className="text-center mb-4">
            My Wishlist ({wishList?.length || 0})
          </h4>

          {wishList?.length === 0 ? (
            <p className="text-center">Your Wishlist is Empty</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-center gap-5">
              {wishList?.map((item) => (
                // console.log(item),
                <div className="card" key={item._id} style={{ width: "20rem" }}>
                  <img
                    src={item.product.productImage}
                    className="card-img-top"
                    alt={item.product.productName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h6 className="card-title">{item.product.productName}</h6>

                    <h5>${item.product.productPrice}</h5>

                    <div className="d-flex flex-column gap-2">
                      <Link
                        to={addedProductId === item.product._id ? "/cart" : "#"}
                        onClick={() => {
                          addToCart(item.product, item.productSize);
                          setAddedProductId(item.product._id);
                        }}
                        className="btn btn-primary"
                      >
                        {addedProductId === item.product._id
                          ? "Go To Cart"
                          : "Add To Cart"}
                      </Link>

                      <Link
                        to="#"
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          removeToWishlist(item._id);
                          setRemovedId(item?._id);
                        }}
                      >
                        {removedId === item?._id
                          ? "Remove from Wishlist"
                          : "Remove Wishlist"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WishListPage;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainHeader from "./components/MainHeader";

function App() {
  const [productPage, setProductPage] = useState(true);

  return (
    <>
      <MainHeader />
      <main className="container py-5">
        <section className="mb-5">
          <div className="d-flex justify-content-center align-items-center ">
            <img
              src="https://img.freepik.com/premium-photo/young-cheerful-couple-have-fun-drive-shopping-trolley-cart-holding-shopping-bag-mall_146105-24123.jpg?w=1080"
              alt=""
              className="img-fluid"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center py-5">Category Section</h2>
        <div className="d-flex justify-content-between flex-row flex-wrap gap-4 justify-content-sm-center">
          <div className="d-flex align-items-center flex-column">
            <Link to={`/category/Women`}>
              <img
                src="https://img.freepik.com/free-photo/happy-young-woman-uses-her-phone-posing-with-colorful-shopping-bags-studio_8353-5606.jpg"
                className="img-fluid"
                alt="women"
                width="410"
              />
            </Link>
            <h4>Women</h4>
          </div>
          <div className="d-flex align-items-center flex-column">
            {" "}
            <Link to={`/category/Men`}>
              <img
                src="https://img.freepik.com/premium-photo/online-home-shopping-time-portrait-young-bearded-man-sitting-floor-with-mobile-phone-with-crossed-legs-with-shopping-bags_255757-7840.jpg"
                className="img-fluid"
                alt="men"
                width="410"
              />
            </Link>
            <h4>Men</h4>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Link to={`/category/Women Sport`}>
              <img
                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2"
                className="img-fluid"
                alt="women sports wear"
                width="410"
              />
            </Link>
            <h4>Women Sports</h4>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Link to={`/category/Men Sport`}>
              <img
                src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51"
                className="img-fluid"
                alt="men sports wear"
                width="410"
              />
            </Link>
            <h4>Men Sports</h4>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Link to={`/category/Child`}>
              <img
                src="https://images.pexels.com/photos/8471820/pexels-photo-8471820.jpeg"
                className="img-fluid"
                alt="kids clothing"
                width="410"
              />
            </Link>
            <h4>Child Clothes</h4>
          </div>
        </div>
        </section>
        <section>
        <div className="py-5 d-flex justify-content-center flex-column align-items-center">
          <h1 className="pt-3 ">Ecommerce Website</h1>
          <div
            className="btn btn-primary"
            onClick={() => setProductPage(false)}
          >
            <Link
              to={`/productPage`}
              className="text-light text-decoration-none"
            >
              {productPage ? "Go to Product Page" : "See Products"}
            </Link>
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

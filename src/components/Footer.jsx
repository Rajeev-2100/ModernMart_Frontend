const Footer = () => {
  return (
    <footer className="bg-white text-dark py-3 mt-auto w-100 shadow">
      <div className="container">
        <div className="text-center">
          <h6 className="mb-1 fs-6">Ecommerce Dashboard</h6>
          <small className="text-secondary">
            © {new Date().getFullYear()} All rights reserved | Built with React
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
const Footer = () => {
     return (
    <footer className="bg-light text-center py-3 mt-auto">
      <small className="text-muted">
        &copy; {new Date().getFullYear()} Josh Canterbury | Funky Finds E-Commerce &nbsp;|&nbsp;
        Products powered by{" "}
        <a
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-muted"
        >
          FakeStoreAPI
        </a>{" "}
        |&nbsp;
        <a
          href="https://github.com/CanterCode/ecommerce-site-funky-finds"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-muted"
        >
          GitHub Repo
        </a>
      </small>
    </footer>
  );
};


export default Footer;
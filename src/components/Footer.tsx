const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-auto">
  <small className="text-muted">
    © {new Date().getFullYear()} Funky Finds by Josh Canterbury —{" "}
    <a
      href="https://github.com/CanterCode/ecommerce-site-funky-finds"
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none"
    >
      GitHub Repo
    </a>
  </small>
</footer>
  );
};

export default Footer;
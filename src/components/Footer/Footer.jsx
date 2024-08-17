import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../../../public/log.png";

const Footer = () => {
  return (
    <>
      <footer className="footer text-base-content px-6 py-5 mt-20 border-t-2 border-gray-400">
        <aside className="grid-flow-col items-center">
          <img src={logo} alt="" className="w-12" />{" "}
          <div>
            <h1 className="text-lg font-semibold">EvoPo Shop</h1>
            {/* <p className="text-sm font-semibold">
              Providing service human since 2018
            </p> */}
          </div>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a className="btn btn-ghost ">
              <FaFacebook className="text-lg" /> Facebook
            </a>
            <a className="btn btn-ghost ">
              <FaXTwitter className="text-lg" /> XTwitter
            </a>
            <a className="btn btn-ghost ">
              <FaInstagram className="text-lg" /> Instagram
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;

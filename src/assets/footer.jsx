import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
        </a>
        <span class="mb-3 mb-md-0 text-muted">© <a href="https://codextarun.vercel.app/">codextarun.vercel.app</a></span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex ">
        <li><a className="text-muted text-2xl px-5" href="https://github.com/imtarunk"><FaGithub /></a></li>
        <li><a className="text-muted text-2xl px-5" href="#"><FaEarthAmericas /></a></li>
        <li><a className="text-muted text-2xl px-5" href="#"><FaInstagram /></a></li>
      </ul>
    </footer>
  )
}

export default Footer
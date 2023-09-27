import React from "react";
import { footer, footerInit } from "./Footer.module.css";

export const Footer = () => {
  const pathElement = window.location.pathname;
  console.log(pathElement);
  return (
    <footer
      className={
        pathElement === "/login" || pathElement === "/signup"
          ? footerInit
          : footer
      }
    >
      <p>© {new Date().getFullYear()} Agustín Pérez</p>
      <p>
        GitHub:{" "}
        <a
          href="https://github.com/bobgus39"
          target="_blank"
          rel="noopener noreferrer"
        >
          bobgus39
        </a>
      </p>
    </footer>
  );
};

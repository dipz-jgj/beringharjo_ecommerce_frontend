import React from "react";
import { APP_NAME } from "../../utils/constants";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2025 {APP_NAME}. Build with React & TypeScript</p>
    </footer>
  );
};

export default Footer;

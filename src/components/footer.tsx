import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="flex justify-center items-center">
          <Image
            src="/json-schema-logo.png"
            width={200}
            height={80}
            alt="Logo"
          />
        </div>
        <p className="my-3 max-w-[600px] mx-auto">
          Convert and validate your JSON data against JSON Schema with ease.
          Ensure structure, type, and constraint compliance for reliable data
          integrity.
        </p>
        <p className="my-3 text-sm sm:text-center">
          Made with love by{" "}
          <a
            href="https://github.com/isamrish"
            target="_blank"
            className="text-blue-500"
          >
            Amrish
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

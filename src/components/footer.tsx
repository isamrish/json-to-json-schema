import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="flex justify-center items-center">
          <Image
            src="/json-schema-logo.png"
            width={200}
            height={80}
            alt="Logo"
          />
        </div>
        <p className="my-3 max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
          Convert and validate your JSON data against JSON Schema with ease.
          Ensure structure, type, and constraint compliance for reliable data
          integrity.
        </p>
        <p className="my-3 text-sm text-gray-500 sm:text-center dark:text-gray-400">
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

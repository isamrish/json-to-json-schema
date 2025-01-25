"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { CiDark, CiLight } from "react-icons/ci";
import { ThemeContext } from "@/context/theme-context";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="bg-white">
      <header className="py-4 flex justify-between items-center text-xl font-bold max-w-[1400px] mx-auto">
        <a
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/json-schema-logo.png"
            width={200}
            height={80}
            alt="Logo"
          />
        </a>
        <div
          className="cursor-pointer bg-teal-50 border-teal-400 border rounded"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <CiLight className="text-3xl" />
          ) : (
            <CiDark className="text-3xl" />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;

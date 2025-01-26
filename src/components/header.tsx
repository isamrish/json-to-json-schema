"use client";
import { useContext } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mode } from "./mode";
import { SettingComp as Settings } from "./settings";
import { Label } from "@/components/ui/label";
import { ConfigContext } from "@/context/config-context";

const Header = () => {
  const { draft } = useContext(ConfigContext);
  return (
    <header className="py-4 flex justify-between items-center text-xl font-bold max-w-[1400px] mx-auto">
      <Link
        href="/"
        className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <Image src="/json-schema-logo.png" width={200} height={80} alt="Logo" />
      </Link>
      <div className="flex items-center">
        <Label className="mr-3">
          SCHEMA DRAFT: <span className="font-semibold">{draft}</span>
        </Label>
        <Settings />
        <div className="ml-3">
          <Mode />
        </div>
      </div>
    </header>
  );
};

export default Header;

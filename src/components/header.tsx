"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiDark, CiLight } from "react-icons/ci";
import { ThemeContext } from "@/context/theme-context";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { editorThemes } from "@/constants";

const Header = () => {
  const { editorTheme, theme, updateEditorTheme, toggleTheme } =
    useContext(ThemeContext);
  return (
    <div className="bg-white">
      <header className="py-4 flex justify-between items-center text-xl font-bold max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/json-schema-logo.png"
            width={200}
            height={80}
            alt="Logo"
          />
        </Link>
        <div className="flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Settings />
                Setting
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Choose your setting</DialogTitle>
                <Card className="pt-3">
                  <CardHeader>
                    <CardTitle>Text Editor Theme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={editorTheme}
                      onValueChange={(value) => {
                        updateEditorTheme(value);
                      }}
                    >
                      {editorThemes?.map((theme) => {
                        return (
                          <div
                            className="flex items-center space-x-2"
                            key={theme.label}
                          >
                            <RadioGroupItem
                              value={theme.value}
                              id={theme.label}
                            />
                            <Label htmlFor="r1">{theme.label}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div
            className="cursor-pointer ml-3 bg-teal-50 border-teal-400 border rounded"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <CiLight className="text-3xl" />
            ) : (
              <CiDark className="text-3xl" />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

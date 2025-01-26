"use client";
import { createContext, useState } from "react";

const ConfigContext = createContext<{
  theme: string;
  editorTheme: string;
  toggleTheme: React.MouseEventHandler<HTMLDivElement>;
  updateEditorTheme: (theme: string) => void;
}>({
  theme: "dark",
  editorTheme: "vs-dark",
  toggleTheme: () => {},
  updateEditorTheme: () => {},
});

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateEditorTheme = (theme: string) => {
    setEditorTheme(theme);
  };

  return (
    <ConfigContext.Provider
      value={{ theme, editorTheme, toggleTheme, updateEditorTheme }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };

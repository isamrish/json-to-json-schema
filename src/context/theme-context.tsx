"use client";
import { createContext, useState } from "react";

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: React.MouseEventHandler<HTMLDivElement>;
}>({ theme: "dark", toggleTheme: () => {} });

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

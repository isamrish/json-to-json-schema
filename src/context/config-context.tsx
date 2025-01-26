"use client";
import { createContext, useState } from "react";

const ConfigContext = createContext<{
  theme: string;
  editorTheme: string;
  draft: string;
  toggleTheme: React.MouseEventHandler<HTMLDivElement>;
  updateEditorTheme: (theme: string) => void;
  updateDraft: (draft: string) => void;
}>({
  theme: "dark",
  editorTheme: "vs-dark",
  draft: "draft07",
  toggleTheme: () => {},
  updateEditorTheme: () => {},
  updateDraft: () => {},
});

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [draft, updateDraft] = useState("draft07");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateEditorTheme = (theme: string) => {
    setEditorTheme(theme);
  };

  return (
    <ConfigContext.Provider
      value={{
        theme,
        editorTheme,
        toggleTheme,
        updateEditorTheme,
        draft,
        updateDraft,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };

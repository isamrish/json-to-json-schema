"use client";
import { createContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

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
  const [value, setValue] = useLocalStorage("config", {
    draft: "draft07",
    editorTheme: "vs-dark",
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateEditorTheme = (theme: string) => {
    setValue((prev) => ({
      ...prev,
      editorTheme: theme,
    }));
  };

  const updateDraft = (draft: string) => {
    setValue((prev) => ({
      ...prev,
      draft,
    }));
  };

  return (
    <ConfigContext.Provider
      value={{
        theme,
        editorTheme: value?.editorTheme,
        toggleTheme,
        updateEditorTheme,
        draft: value?.draft,
        updateDraft,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };

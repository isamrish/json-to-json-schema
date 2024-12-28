import { ThemeProvider } from "@/context/theme-context";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { Providers };

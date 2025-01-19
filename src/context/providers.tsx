import { ThemeProvider } from "@/context/theme-context";
import { StorageProvider } from "./storage-context";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StorageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StorageProvider>
  );
};

export { Providers };

import { ConfigProvider } from "@/context/config-context";
import { StorageProvider } from "./storage-context";
import { ThemeProvider } from "./theme-context";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StorageProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </StorageProvider>
    </ThemeProvider>
  );
};

export { Providers };

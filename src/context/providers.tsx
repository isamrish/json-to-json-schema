import { ConfigProvider } from "@/context/config-context";
import { StorageProvider } from "./storage-context";
import { ThemeProvider } from "./theme-context";
import { TooltipProvider } from "@/components/ui/tooltip";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <StorageProvider>
          <ConfigProvider>{children}</ConfigProvider>
        </StorageProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export { Providers };

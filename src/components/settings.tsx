import { useContext } from "react";
import { Settings } from "lucide-react";
import { ConfigContext } from "@/context/config-context";
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
import { editorThemes, drafts } from "@/constants";

export const SettingComp = () => {
  const { editorTheme, updateEditorTheme, draft, updateDraft } =
    useContext(ConfigContext);
  return (
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
                      <RadioGroupItem value={theme.value} id={theme.label} />
                      <Label htmlFor="r1">{theme.label}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
          <Card className="pt-3">
            <CardHeader>
              <CardTitle>JSON SCHEMA DRAFT</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={draft}
                onValueChange={(value) => {
                  updateDraft(value);
                }}
              >
                {drafts?.map((draft) => {
                  return (
                    <div
                      className="flex items-center space-x-2"
                      key={draft.label}
                    >
                      <RadioGroupItem value={draft.value} id={draft.label} />
                      <Label htmlFor="r1">{draft.label}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

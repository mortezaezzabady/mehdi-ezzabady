import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useEffect } from "react";
import { ScrollArea } from "./components/ui/scroll-area";

function LanguageSwitchButton() {
  const { t, i18n } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Globe />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">
          {t("language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => i18n.changeLanguage("fa")}>
          فارسی
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TimelineItem({
  isStart,
  isEnd,
  title,
  date,
  media,
  tag,
  description,
  location,
}: {
  isStart: boolean;
  isEnd: boolean;
  title: string;
  date: string;
  media: string[];
  tag: string[];
  description: string;
  location?: string;
}) {
  return <ScrollArea>{title}</ScrollArea>;
}

function App() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.style.direction =
      i18n.language == "fa" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="h-svh w-svw flex flex-col">
      <div className="flex flex-row px-4 pt-4">
        <h1 className="text-sm sm:text-lg font-bold">{t("in-memory-of")}</h1>
        <span className="flex-1" />
        <LanguageSwitchButton />
      </div>

      <h1 className="text-xl sm:text-3xl font-bold px-4 pb-4">
        {t("mehdi-ezzabady")}
      </h1>
      <div className="flex-1"></div>
    </div>
  );
}

export default App;

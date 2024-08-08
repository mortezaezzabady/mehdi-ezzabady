import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TimelineEntry } from "./types";
import { timelineEntries } from "./i18n-resources/timeline";
import BiographyFa from "./i18n-resources/bio/fa";
import BiographyEn from "./i18n-resources/bio/en";

function TimelineItem({
  isStart,
  isEnd,
  entry,
}: {
  isStart: boolean;
  isEnd: boolean;
  entry: TimelineEntry;
}) {
  const { i18n } = useTranslation();
  const lang: "en" | "fa" = i18n.language == "fa" ? "fa" : "en";
  return (
    <div className="flex flex-row items-center justify-center w-fit gap-0">
      {!isStart && <span className="h-1 w-[calc(100svw/5)] bg-muted"></span>}
      <div className="w-4 h-4 rounded-full bg-muted border-foreground/20 border-solid border-2 hover:bg-foreground/40 transition-all relative overflow-visible">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="absolute inset-0">
              <TooltipProvider>
                <Tooltip open={true}>
                  <TooltipTrigger asChild>
                    <div className="absolute inset-0"></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <img
                      className="max-w-20"
                      src={`/images/timeline/${entry.media[0]}`}
                    />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-start">
                  {entry.title[lang]}
                </DrawerTitle>
                <DrawerDescription className="text-start">
                  {entry.date[lang]}
                </DrawerDescription>
                <DrawerDescription className="text-start">
                  {(entry.location ?? { en: "", fa: "" })[lang]}
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full px-14">
                <Carousel className="max-w-xs" dir="ltr">
                  <CarouselContent>
                    {...entry.media.map((m) => {
                      return (
                        <CarouselItem className="flex flex-row items-center justify-center h-full w-full">
                          <img src={`/images/timeline/${m}`} />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="flex flex-col absolute top-5 start-1/2 translate-x-[50%] items-center justify-center">
          <div className="overflow-visible flex flex-row items-center justify-center">
            <button className="block w-24 md:w-36 text-center break-words text-sm md:text-md">
              {entry.title[lang]}
            </button>
          </div>
          <div className="overflow-visible flex flex-row items-center justify-center">
            <button className="block w-24 md:w-36 text-center break-words text-xs md:text-sm">
              {entry.date[lang]}
            </button>
          </div>
          <div className="overflow-visible flex flex-row items-center justify-center ">
            <button className="block w-24 md:w-36 text-center break-words text-xs md:text-sm text-muted-foreground">
              {(entry.location ?? { en: "", fa: "" })[lang]}
            </button>
          </div>
        </div>
      </div>
      {!isEnd && <span className="h-1 w-[calc(100svw/5)] bg-muted"></span>}
    </div>
  );
}

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

function App() {
  const { t, i18n } = useTranslation();
  const [borderVisible, setBorderVisible] = useState<boolean>(false);
  const dir = useMemo(
    () => (i18n.language == "fa" ? "rtl" : "ltr"),
    [i18n.language]
  );
  useEffect(() => {
    document.documentElement.style.direction = dir;
  }, [dir]);
  return (
    <div className="h-svh w-svw flex flex-col">
      <div className="bg-background/60 backdrop-blur-lg h-36 w-full absolute z-20">
        {borderVisible && (
          <div className="h-px bg-border/30 absolute bottom-0 start-0 end-0 z-20"></div>
        )}
      </div>
      <div className="flex flex-row px-4 pt-4 z-30 relative isolate">
        <h1 className="text-sm sm:text-lg font-bold">{t("in-memory-of")}</h1>
        <span className="flex-1" />
        <LanguageSwitchButton />
      </div>

      <h1 className="text-xl sm:text-3xl font-bold px-4 pb-4 z-30 relative isolate">
        {t("mehdi-ezzabady")}
      </h1>
      <div className="flex-1 flex flex-col">
        <Tabs
          dir={dir}
          defaultValue="timeline"
          className="w-full flex flex-col items-start flex-1 gap-1"
        >
          <TabsList className="w-[calc(100%-2rem)] grid grid-cols-3 sm:max-w-80 ms-4 z-20 relative isolate">
            <TabsTrigger value="timeline">{t("timeline")}</TabsTrigger>
            <TabsTrigger value="location">{t("location")}</TabsTrigger>
            <TabsTrigger value="bio">{t("bio")}</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="flex-1 w-full">
            <MainTab />
          </TabsContent>
          <TabsContent value="location" className="flex-1 w-full">
            <LocationTab />
          </TabsContent>
          <TabsContent value="bio" asChild>
            <BiographyTab setBorderVisible={setBorderVisible} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BiographyTab({
  setBorderVisible,
}: {
  setBorderVisible: (value: boolean) => void;
}) {
  const { i18n } = useTranslation();

  function onScroll(target: HTMLDivElement) {
    setBorderVisible(target.scrollTop > 2);
  }

  useEffect(() => {
    return () => setBorderVisible(false);
  }, []);

  return (
    <ScrollArea
      className="w-full !absolute inset-0"
      onScrollCapture={(e) => onScroll(e.target as HTMLDivElement)}
    >
      <div className="w-full flex flex-col min-h-full items-center">
        <div className="w-full max-w-4xl px-4 pt-40">
          {i18n.language == "fa" ? <BiographyFa /> : <BiographyEn />}
        </div>
      </div>
      <ScrollBar className="z-40" orientation="vertical" />
    </ScrollArea>
  );
}

function LocationTab() {
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="w-full h-full max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:h-[30rem] sm:w-[30rem]">
        <iframe
          onLoad={() => setLoading(false)}
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3386.182375772587!2d54.388369475628046!3d31.928805574029532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDU1JzQzLjciTiA1NMKwMjMnMjcuNCJF!5e0!3m2!1sen!2suk!4v1723123419352!5m2!1sen!2suk"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
          <Loader2 className="w-8 h-8 !m-0 animate-spin" />
          <span className="text-xs">{t("loading")}</span>
        </div>
      )}
    </div>
  );
}

function MainTab() {
  const { i18n } = useTranslation();
  const dir = useMemo(
    () => (i18n.language == "fa" ? "rtl" : "ltr"),
    [i18n.language]
  );
  return (
    <ScrollArea className="w-full h-full" dir={dir}>
      <div className="flex h-full flex-row items-center justify-center">
        <div className="h-1 w-[calc(100svw/2-0.5rem)]"></div>
        {...timelineEntries.map((entry, index) => {
          return (
            <TimelineItem
              isStart={index == 0}
              isEnd={index == timelineEntries.length - 1}
              entry={entry}
            />
          );
        })}
        <div className="h-1 w-[calc(100svw/2-0.5rem)]"></div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default App;

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
import { useEffect, useMemo } from "react";
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

interface TimelineEntry {
  title: string;
  date: string;
  media: string[];
  tag: string[];
  description: string;
  location?: string;
}

const timelineEntries: TimelineEntry[] = [
  {
    title: "مرگ",
    date: "۱۵ تیر ۱۴۰۳",
    media: [],
    tag: [],
    description: "ola",
    location: "یزد",
  },
  {
    title: "test2",
    date: "yo",
    media: [],
    tag: [],
    description: "ola",
    location: "Yazd",
  },
  {
    title: "test3",
    date: "yo",
    media: [],
    tag: [],
    description: "ola",
    location: "Yazd",
  },
  {
    title: "test4",
    date: "yo",
    media: [],
    tag: [],
    description: "ola",
    location: "Yazd",
  },
];

function TimelineItem({
  isStart,
  isEnd,
  entry,
}: {
  isStart: boolean;
  isEnd: boolean;
  entry: TimelineEntry;
}) {
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
                    <img src={entry.media[0]} />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-start">{entry.title}</DrawerTitle>
                <DrawerDescription className="text-start">
                  {entry.date}
                </DrawerDescription>
                <DrawerDescription className="text-start">
                  {entry.location}
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full px-14">
                <Carousel className="max-w-xs aspect-square" dir="ltr">
                  <CarouselContent>
                    <CarouselItem className="flex flex-row items-center justify-center h-full w-full">
                      1
                    </CarouselItem>
                    <CarouselItem className="flex flex-row items-center justify-center h-full w-full">
                      2
                    </CarouselItem>
                    <CarouselItem className="flex flex-row items-center justify-center h-full w-full">
                      3
                    </CarouselItem>
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
              {entry.title}
            </button>
          </div>
          <div className="overflow-visible flex flex-row items-center justify-center">
            <button className="block w-24 md:w-36 text-center break-words text-xs md:text-sm">
              {entry.date}
            </button>
          </div>
          <div className="overflow-visible flex flex-row items-center justify-center ">
            <button className="block w-24 md:w-36 text-center break-words text-xs md:text-sm text-muted-foreground">
              {entry.location}
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
  const dir = useMemo(
    () => (i18n.language == "fa" ? "rtl" : "ltr"),
    [i18n.language]
  );
  useEffect(() => {
    document.documentElement.style.direction = dir;
  }, [dir]);
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
      <div className="flex-1">
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
      </div>
    </div>
  );
}

export default App;

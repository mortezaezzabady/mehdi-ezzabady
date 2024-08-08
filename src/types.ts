export interface TranslatableString {
  en: string;
  fa: string;
}

export interface TimelineEntry {
  title: TranslatableString;
  date: TranslatableString;
  media: string[];
  tag: TranslatableString[];
  description: TranslatableString;
  location?: TranslatableString;
  distanceFromPrevious: number;
}

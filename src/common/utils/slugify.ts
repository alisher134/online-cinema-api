const translitMap: Record<string, string> = {
  А: 'A',
  а: 'a',
  Б: 'B',
  б: 'b',
  В: 'V',
  в: 'v',
  Г: 'G',
  г: 'g',
  Ґ: 'G',
  ґ: 'g',
  Д: 'D',
  д: 'd',
  Е: 'E',
  е: 'e',
  Ё: 'E',
  ё: 'e',
  Ж: 'ZH',
  ж: 'zh',
  З: 'Z',
  з: 'z',
  И: 'I',
  и: 'i',
  Й: 'J',
  й: 'j',
  К: 'K',
  к: 'k',
  Л: 'L',
  л: 'l',
  М: 'M',
  м: 'm',
  Н: 'N',
  н: 'n',
  О: 'O',
  о: 'o',
  П: 'P',
  п: 'p',
  Р: 'R',
  р: 'r',
  С: 'S',
  с: 's',
  Т: 'T',
  т: 't',
  У: 'U',
  у: 'u',
  Ф: 'F',
  ф: 'f',
  Х: 'H',
  х: 'h',
  Ц: 'TS',
  ц: 'ts',
  Ч: 'CH',
  ч: 'ch',
  Ш: 'SH',
  ш: 'sh',
  Щ: 'SCH',
  щ: 'sch',
  Ъ: '',
  ъ: '',
  Ы: 'Y',
  ы: 'y',
  Ь: '',
  ь: '',
  Э: 'E',
  э: 'e',
  Ю: 'YU',
  ю: 'yu',
  Я: 'YA',
  я: 'ya',
};

const translate = (str: string): string => {
  return str
    .split('')
    .map((char) => translitMap[char] ?? char)
    .join('');
};

export const slugify = (str: string): string => {
  return translate(str)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
};

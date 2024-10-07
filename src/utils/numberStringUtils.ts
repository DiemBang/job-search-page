export const numberToWords = (number: number) => {
  const units = [
    '',
    'ett',
    'två',
    'tre',
    'fyra',
    'fem',
    'sex',
    'sju',
    'åtta',
    'nio',
  ];
  const teens = [
    'tio',
    'elva',
    'tolv',
    'tretton',
    'fjorton',
    'femton',
    'sexton',
    'sjutton',
    'arton',
    'nitton',
  ];

  if (number <= 0) return '';
  if (number <= 20) {
    if (number < 10) return units[number];
    if (number < 20) return teens[number - 10];
  }

  return 'Över 20 jobb';
};

export const getFirstLetterWithUppercase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

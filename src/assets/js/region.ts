export type typeMajor = {
  code: string;
  name: string;
  fullName: string;
};

export const MAJOR: typeMajor[] = [
  {
    code: '01',
    name: '서울',
    fullName: '서울특별시',
  },
  {
    code: '02',
    name: '인천',
    fullName: '인천광역시',
  },
  {
    code: '03',
    name: '대전',
    fullName: '대전광역시',
  },
  {
    code: '04',
    name: '대구',
    fullName: '대구광역시',
  },
  {
    code: '05',
    name: '부산',
    fullName: '부산광역시',
  },
  {
    code: '06',
    name: '광주',
    fullName: '광주광역시',
  },
];

export type typeMinor = {
  '01': MinorItem[];
  '02': MinorItem[];
  '03': MinorItem[];
  '04': MinorItem[];
  '05': MinorItem[];
  '06': MinorItem[];
};

export type MinorItem = {
  code: string;
  name: string;
  fullName: string;
};

export const MINOR: typeMinor = {
  '01': [
    {
      code: '01',
      name: '송파',
      fullName: '송파구',
    },
    {
      code: '02',
      name: '강동',
      fullName: '강동구',
    },
  ],
  '02': [
    {
      code: '01',
      name: '중구',
      fullName: '중구',
    },
    {
      code: '02',
      name: '동구',
      fullName: '동구',
    },
  ],
  '03': [
    {
      code: '01',
      name: '동구',
      fullName: '동구',
    },
    {
      code: '02',
      name: '중구',
      fullName: '중구',
    },
  ],
  '04': [
    {
      code: '01',
      name: '중구',
      fullName: '중구',
    },
    {
      code: '02',
      name: '동구',
      fullName: '동구',
    },
  ],
  '05': [
    {
      code: '01',
      name: '중구',
      fullName: '중구',
    },
    {
      code: '02',
      name: '서구',
      fullName: '서구',
    },
  ],
  '06': [
    {
      code: '01',
      name: '광산구',
      fullName: '광산구',
    },
    {
      code: '02',
      name: '북구',
      fullName: '북구',
    },
  ],
};

export const returnMinorByMajorCode = (code: keyof TypeMinor) => {
  return MINOR[code];
};

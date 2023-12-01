import {format as dateFnsFormat, isToday, isThisYear} from 'date-fns';
import {ko} from 'date-fns/locale';

const launching = new Date(2021, 9, 1);

export const format = {
  x요일(date: Date) {
    return dateFnsFormat(date, 'EEE요일', {locale: ko});
  },
  'yyyy년 MM월 dd일'(date: Date) {
    return dateFnsFormat(date, 'yyyy년 MM월 dd일');
  },
  'yyyy-MM-dd 오후 hh:mm'(date: Date) {
    return dateFnsFormat(date, 'yyyy-MM-dd a hh:mm')
      .replace('AM', '오전')
      .replace('PM', '오후');
  },
  'yy/MM/dd'(date: Date) {
    return dateFnsFormat(date, 'yy/MM/dd');
  },
  'yyyy/MM/dd'(date: Date) {
    return dateFnsFormat(date, 'yyyy/MM/dd');
  },
  'yyyy.MM'(date: Date) {
    return dateFnsFormat(date, 'yyyy.MM.');
  },
  'yyyy.MM.dd'(date: Date) {
    return dateFnsFormat(date, 'yyyy.MM.dd.');
  },
  'yyyy. MM. dd'(date: Date) {
    return dateFnsFormat(date, 'yyyy. MM. dd.');
  },
  'MM.dd D요일'(date: Date) {
    return dateFnsFormat(date, 'MM.dd EEE요일', {locale: ko});
  },
  'M월 dd일'(date: Date) {
    return dateFnsFormat(date, 'M월 dd일');
  },
  'M월 d일'(date: Date) {
    return dateFnsFormat(date, 'M월 d일');
  },
  'M월 d일 / 오전 hh시 mm분'(date: Date) {
    return `${this['M월 d일'](date)} / ${this['오전 hh시 mm분'](date)}`;
  },
  '오전 hh시 mm분': (date: Date, noonFormatUsed = false) => {
    const result = dateFnsFormat(date, 'a hh시 mm분');
    if (
      noonFormatUsed &&
      (result.includes('00시 00분') || result.includes('12시 00분'))
    ) {
      return date.getHours() === 0 ? '자정' : '정오';
    } else {
      return result.replace('AM', '오전').replace('PM', '오후');
    }
  },
  '오전 hh:mm'(date: Date) {
    return dateFnsFormat(date, 'a hh:mm')
      .replace('AM', '오전')
      .replace('PM', '오후');
  },
  'x일전'(date : Date) {
    const milliSeconds : number = new Date().getTime() - date.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) {
      return `방금 전`;
    }
    const minutes : number = seconds / 60;
    if (minutes < 60) {
      return `${Math.floor(minutes)}분 전`;
    }
    const hours : number = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)}시간 전`;
    }
    const days : number = hours / 24;
    if (days < 7) {
      return `${Math.floor(days)}일 전`;
    }
    const weeks : number = days / 7;
    if (weeks < 5) {
      return `${Math.floor(weeks)}주 전`;
    }
    const months : number = days / 30;
    if (months < 12) {
      return `${Math.floor(months)}개월 전`;
    }
    const years : number = days / 365;
    return launching < date ? `${Math.round(years)}년 전` : '';
  },
  chatTime(date : Date) {
    if (isToday(date)) {
      return this['오전 hh:mm'](date);
    } else if (isThisYear(date)) {
      return this['M월 dd일'](date);
    } else if (launching < date) {
      return this['yyyy.MM.dd'](date);
    } else {
      return '';
    }
  },
  timeout: {
    /**
     * @param {number} millis
     */
    'mm:ss'(millis : number) {
      const allSeconds = millis / 1000;
      const minutes = Math.floor(allSeconds / 60);
      const seconds = Math.floor(allSeconds % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes} : ${seconds}`;
    },
  },
};

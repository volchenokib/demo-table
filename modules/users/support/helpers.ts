import dayjs from 'dayjs';

// 1669830000 -> "2022-11-30T09:40"
// 1669830000 -> "2022-11-30 09:40"
export function millisecondsToDatetime(
  seconds: number,
  format: 'iso' | 'datetime',
): string {
  if (format === 'iso') {
    return dayjs(seconds).format('YYYY-MM-DDTHH:mm');
  } else {
    const milliseconds = seconds * 1000;
    return dayjs(milliseconds).format('YYYY-MM-DD HH:mm');
  }
}

// // "2022-11-30 09:40" -> "2022-11-30T09:40"
export function toDatetimeLocalString(datetimeString: string): string {
  return datetimeString?.replace(' ', 'T');
}

// "2022-11-30T09:40" -> 1669830000
export function datetimeLocalToSeconds(datetimeLocalString: string): number {
  const date = new Date(datetimeLocalString);
  return Math.floor(date.getTime() / 1000);
}

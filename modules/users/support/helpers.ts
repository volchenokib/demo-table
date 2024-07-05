export function millisecondsToDatetimeLocal(milliseconds: number) {
  const date = new Date(milliseconds);
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
}

export function datetimeLocalToMilliseconds(datetimeLocalString: string) {
  const date = new Date(datetimeLocalString);
  return date.getTime();
}

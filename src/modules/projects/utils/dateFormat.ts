import { DateTime } from 'luxon';
export const transformDate = (date: Date) => {
    const dateFormatted = DateTime.fromJSDate(date).toFormat('y-LL-qq')
    return dateFormatted;
}
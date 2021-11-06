
export const convertDate = (date: Date): string => {
    const pad = (s: number) => (s < 10 ? '0' + s : s);
    return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-');
};

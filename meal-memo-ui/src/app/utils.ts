export const convertDate = (date: Date): string => {
    const pad = (s: number) => (s < 10 ? '0' + s : s);
    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
    ].join('-');
};

export interface Identifiable {
    id: number;
}

export const sorted = <T extends Identifiable>(list: T[] | undefined) => {
    if (list) {
        return list
            .slice()
            .sort(
                (a, b) =>
                    JSON.parse(JSON.stringify(a.id)) -
                    JSON.parse(JSON.stringify(b.id))
            );
    } else {
        return [];
    }
};

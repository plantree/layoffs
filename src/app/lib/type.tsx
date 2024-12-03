export type LayoffsItem = {
    date: Date;
    company: string;
    department: string[];
    headcount?: number;
    percentage?: number;
    source: string;
}
export type LayoffsItem = {
    date: Date;
    company: string;
    department?: string[];
    employees?: number;
    ratio?: number;
    source: string;
}
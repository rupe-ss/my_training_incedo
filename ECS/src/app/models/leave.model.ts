export class Leave{
    id?: number | string;
    to: string | Date;
    from: string | Date;
    email?: string;
    year?: number | string;
    numDays: number;
    status?: string;
}
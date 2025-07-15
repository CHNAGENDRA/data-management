export interface DataRecord {
    serial: number;
    date: Date;
    branch: string;
    course: string;
    division: string;
    customer: string;
    csr: string;
    status: 'Sent to Lm' | 'Returned from Lm' | 'Confirmed by Lm';
    outlineShared: boolean;
    deadline: Date;
}

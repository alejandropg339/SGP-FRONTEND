export interface AddQualificationFormInterface {
    qualification: string;
    retrospective: string;
    conclusions: string;
}

export interface AddQualificationResponse {
    status: string;
    msg: string;
    data: Array<any>;
}
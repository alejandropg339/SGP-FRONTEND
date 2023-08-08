export interface ParticipantFormInterface {
    userId: string;
    role: string;
}

export interface AddParticipantResponse {
    status: string;
    msg: string;
    data: Array<any>;
}

export interface ProgramsResponse {
    status: string;
    msg: string;
    data: ProgramsDataInterface[];
}
export interface ProgramsDataInterface {
    id: number;
    nombre: string;
    facultad_id: number;
    director: string;
}
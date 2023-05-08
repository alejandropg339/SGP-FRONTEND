export interface UserInterface {
    numberId: string;
    uCode: number;
    institutionalEmail: string;
    name: string;
    lastName: string;
    phone: string;
    visibility: string;
    programId?: string | null;
    hotbedId?: string | null;
}
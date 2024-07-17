import axios from 'axios';

export interface Locate {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
}

export const fetchLocates = async (lat: number, lng:number): Promise<Locate[]> => {
    try {
        const response = await axios.get<Locate[]>(`/api/study-channels/{studyChannelId}/places?lat=${lat}&lng=${lng}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch locates:', error);
        throw error;
    }
};
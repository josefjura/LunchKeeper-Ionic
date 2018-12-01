import axios from 'axios'

export const API_URL = "https://lunchkeeper-api.herokuapp.com/api"


export async function search(query) {
    var result = await axios.get(`${API_URL}/lunch?q=${query}`);
    return result.data;
}

export async function getDetails(id, source) {
    var result = await axios.get(`${API_URL}/lunch/${source}/${id}`);    
    return result.data;
}

export async function getMenu(id, source) {
    var result = await axios.get(`${API_URL}/lunch/${source}/${id}/menu`);
    return result.data;
}
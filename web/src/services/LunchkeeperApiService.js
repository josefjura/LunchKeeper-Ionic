import request from 'async-request'

export const API_URL = "https://lunchkeeper-api.herokuapp.com/api"


export async function search(query) {
    var result = await request(`${API_URL}/lunch?q=${query}`);
    return JSON.parse(result.body).restaurants;
}

export async function getDetails(id, source) {
    var result = await request(`${API_URL}/lunch/${source}/${id}`);
    return JSON.parse(result.body);
}
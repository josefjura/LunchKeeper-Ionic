import axios from 'axios'

export const API_URL = "https://lunchkeeper-api.herokuapp.com/api"


export async function search(query) {
    try {
        var result = await axios.get(`${API_URL}/lunch?q=${query}`);
        return result.data.restaurants;
    }
    catch (err) {
        console.err(err);
        return [];
    }
}

export async function getDetails(id, source) {
    try {
        var result = await axios.get(`${API_URL}/lunch/${source}/${id}`);
        return result.data;
    }
    catch (err) {
        console.err(err);
        return {};
    }
}

export async function getMenu(id, source) {
    try {
        var result = await axios.get(`${API_URL}/lunch/${source}/${id}/menu`);
        return result.data;
    }
    catch (err) {
        console.err(err);
        return {};
    }
}
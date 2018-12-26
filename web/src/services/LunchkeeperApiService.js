import axios from 'axios'
import store from '../store'

export const API_URL = "https://lunchkeeper-api.herokuapp.com/api"


export async function search(query) {
    try {
        var result = await axios.get(`${API_URL}/lunch?q=${query}`);

        result.data.restaurants.forEach((item) => {
            item.checked = store.getters.restaurants.some(
                x => x.id == item.id && x.source == item.source
            );
        })

        return result.data.restaurants;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function getDetails(id, source) {
    try {
        var result = await axios.get(`${API_URL}/lunch/${source}/${id}`);

        result.data.checked = store.getters.restaurants.some(
            x => x.id == result.data.id && x.source == result.data.source
        );


        return result.data;
    }
    catch (err) {
        console.error(err);
        return {};
    }
}

export async function getMenu(id, source) {
    try {
        var result = await axios.get(`${API_URL}/lunch/${source}/${id}/menu`);
        return result.data;
    }
    catch (err) {
        console.error(err);
        return {};
    }
}
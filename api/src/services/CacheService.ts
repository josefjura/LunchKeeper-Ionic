import { redis } from '../redis'
import { promisify } from 'util'
import { Restaurant, DailyMenu } from '../models/DTO';
const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);


const EXPIRE_DURATION = 2 * 60 * 60;

export async function addItem(hashType: string, key: string, content: object | string): Promise<void> {
    await setAsync(hashType + ':' + key, JSON.stringify(content), 'EX', EXPIRE_DURATION);
}

export async function getItem(hashType: string, key: string): Promise<any> {
    var reply = await getAsync(hashType + ":" + key)
    return JSON.parse(reply);
}

export function setDetails(details: Restaurant) {
    addItem("details", details.id.toString(), details);
}

export function setMenu(key: string, menu: DailyMenu) {
    addItem("menu", key, menu);
}

export function getDetails(key: string): Promise<Restaurant> {
    return getItem("details", key);
}

export function getMenu(key: string): Promise<DailyMenu> {
    return getItem("menu", key);
}



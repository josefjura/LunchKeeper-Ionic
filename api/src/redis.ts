import { createClient } from "redis";


export const REDIS_URL: string = process.env.REDIS_URL
export const redis = createClient(REDIS_URL);


export function init() {
    console.log("Initializing REDIS on " + REDIS_URL);
}


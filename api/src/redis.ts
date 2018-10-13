export const REDIS_URL: string = process.env.REDIS_URL || "redis://redis:6379"

export function init() {
    console.log("Initializing REDIS on " + REDIS_URL);
}


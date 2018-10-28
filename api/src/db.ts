import { connect, connection, disconnect } from 'mongoose'

const MONGO_DB_URI: string = process.env.MONGODB_URI;

export function init() {
    console.log("Initializing MONGO DB on " + MONGO_DB_URI);
    connect(MONGO_DB_URI, (err) => {
        if (err)
            console.log(err);
        else
            console.log("MONGO DB Initialized.")
    });
}

export function destroy() {
    console.log("Disconnecting MONGO DB");
    connection.close().then(() => {
        disconnect().then(
            (res) => { console.log("MONGO DB connection closed.") },
            (err) => { console.error(err) }
        );
    });

}

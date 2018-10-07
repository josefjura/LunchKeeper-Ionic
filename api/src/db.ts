import { connect, connection, disconnect } from 'mongoose'

const MONGO_DB_URI: string = "mongodb://mongo:27017";

export function init() {
    console.log("Initializing MONGO DB");
    connect(MONGO_DB_URI, (err) => {
        console.log("Connected");
        if (err)
            console.log(err);
        else
            connection.db.admin().ping().then(
                (res) => { console.log(res) },
                (err) => { console.error(err) }
            );
    });
}

export function destroy() {
    console.log("Disconnecting MONGO DB");
    connection.close().then(() => {
        console.log("Connection closed");
        disconnect().then(            
            (res) => { console.log(res) },
            (err) => { console.error(err) }
        );
    });

}

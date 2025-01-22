// replicat set credentials
const root_username = process.env.MONGO_INITDB_ROOT_USERNAME;
const root_password = process.env.MONGO_INITDB_ROOT_PASSWORD;

db.getSiblingDB("admin").auth(root_username, root_password);

console.log("Logging in as root user");

const initdb = process.env.MONGO_INITDB_DATABASE;

if (initdb) {

    const initdb_collection = process.env.MONGO_INITDB_DATABASE_COLLECTION

    if (initdb_collection)
    {
        db.getSiblingDB(initdb).createCollection(initdb_collection);

        console.log(`${initdb_collection} Collection created`);
    }

    const initdb_username = process.env.MONGO_INITDB_DATABASE_USERNAME;
    const initdb_password = process.env.MONGO_INITDB_DATABASE_PASSWORD;

    if (!initdb_username || !initdb_password) {
        console.log("MONGO_INITDB_DATABASE_USERNAME and MONGO_INITDB_DATABASE_PASSWORD must be set together");
        console.log(`Skipping creating ${initdb}`);
    }
    else {

        user_exist = db.getSiblingDB(initdb).getUser(initdb_username)
        if (!user_exist)
        {
            // Create user for the database
            db.getSiblingDB(initdb).createUser(
                {
                    "user" : initdb_username,
                    "pwd" : initdb_password,
                    roles: [ { role : "readWrite", db : initdb } ]
                }
            );

            console.log(`Database user created for database ${initdb}`);
        }
        else {
            console.log(`User already created for database ${initdb}`);
        }
    }
}
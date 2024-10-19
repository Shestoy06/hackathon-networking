const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27042';
const dbName = 'TON';

async function createUserCollection() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection('user', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['telegram_id', 'username', 'photo', 'created_at'],
                    properties: {
                        telegram_id: { bsonType: 'int'},
                        username: { bsonType: 'string'},
                        photo: { bsonType: 'string'},
                        bio: { bsonType: 'string'},
                        wallet: { bsonType: 'string'},
                        created_at: { bsonType: 'timestamp'},
                    }
                }
            }
        });

        console.log('Коллекцию "user" создали.');
    } finally {
        await client.close();
    }
}
async function createLinksCollection() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection('Links', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['user_telegram_id'],
                    properties: {
                        user_telegram_id: { bsonType: 'int'}
                    }
                }
            }
        });

        console.log('Коллекция "Links" создана.');
    } finally {
        await client.close();
    }
}
async function createThemesCollection() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection('Themes', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title', 'image'],
                    properties: {
                        title: { bsonType: 'string'},
                        image: { bsonType: 'string'},
                        created_at: { bsonType: 'timestamp'}
                    }
                }
            }
        });

        console.log('Коллекция "Tags" создана.');
    } finally {
        await client.close();
    }
}

async function createTagsCollection() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection('tags', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title', 'user_telegram_id', 'background_color', 'text_color', 'created_at'],
                    properties: {
                        title: { bsonType: 'string'},
                        user_telegram_id: { bsonType: 'int'},
                        baclground_color: { bsonType: 'string'},
                        text_color: { bsonType: 'string'},
                        created_at: { bsonType: 'timestamp'}
                    }
                }
            }
        });

        console.log('Коллекция "Tags" создана.');
    } finally {
        await client.close();
    }
}

createUserCollection().catch(console.error);
createLinksCollection().catch(console.error);
createThemesCollection().catch(console.error);
createTagsCollection().catch(console.error);
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

const createPlacesTableQuery = 'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)';
const insertPlaceQuery = 'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)';
const fetchPlacesQuery = 'SELECT * FROM places';

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(createPlacesTableQuery,
                [],
                () => {
                resolve();
                },
                (_, err) => {
                reject(err);
                });
        });
    });
}

export const insertPlace = (title, imageUri, address, lat, lng) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(insertPlaceQuery,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                });
        });
    });
}

export const fetchPlaces = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(fetchPlacesQuery,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                });
        });
    });
}
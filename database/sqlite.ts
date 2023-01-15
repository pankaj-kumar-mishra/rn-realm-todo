import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

const db: SQLiteDatabase = openDatabase({name: 'TodoList.db'});

export default db;

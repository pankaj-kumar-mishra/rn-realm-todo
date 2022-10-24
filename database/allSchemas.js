import Realm from 'realm';

// Define all schemas
export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';

// Define all models and properties
export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'int', // primary key (not auto increment)
    name: {type: 'string', index: true},
    done: {type: 'bool', default: false},
    // details: 'string',  // i will add later
    // createdOn: 'date',  // i will add later
    // updatedOn: 'date',  // i will add later
  },
};

export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    createdOn: 'date',
    // updatedOn: 'date',  // i will add later
    // here todos as an array that hold multiple todo
    todos: {type: 'list', objectType: TODO_SCHEMA},
  },
};

// database information
const databaseOptions = {
  path: 'todoListApp.realm',
  schema: [TodoListSchema, TodoSchema],
  // schemaVersion: 0, // optional
};

// Format is same
// export const dummyFn = argument =>
//   new Promise(async (resolve, reject) => {
//     try {
//     } catch (error) {}
//   });
// export const dummyFn = argument => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (error) {}
//   });
// };

// Functions for todoList
export const getAllTodoList = () =>
  new Promise(async (resolve, reject) => {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        // get all records of TodoList
        const allTodoLists = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoLists);
      });
    } catch (error) {
      reject(error);
    }
  });

export const insertNewTodoList = newTodoList =>
  new Promise(async (resolve, reject) => {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        const task = realm.create(TODOLIST_SCHEMA, newTodoList);
        resolve(task);
      });
    } catch (error) {
      reject(error);
    }
  });

export default new Realm(databaseOptions);

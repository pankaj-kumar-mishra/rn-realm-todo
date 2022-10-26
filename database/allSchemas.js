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
    updatedOn: 'date',
    done: {type: 'bool', default: false},
    // here todos as an array that hold multiple todo
    // todos: {type: 'list', objectType: TODO_SCHEMA},
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
        // const allTodoLists = realm.objects(TODOLIST_SCHEMA);

        // For Sorting
        // const allTodoLists = realm
        //   .objects(TODOLIST_SCHEMA)
        //   .sorted('updatedOn', true); // true => reverse(desc)

        // For filtering
        // const allTodoLists = realm
        //   .objects(TODOLIST_SCHEMA)
        //   .filter(item => item.name === 'C2');
        // const allTodoLists = realm
        //   .objects(TODOLIST_SCHEMA)
        //   .filtered('name CONTAINS[c] "P"');

        // resolve(allTodoLists);

        // For Filtering and Sorting
        const allTodoLists = realm
          .objects(TODOLIST_SCHEMA)
          .sorted('updatedOn', true);

        const inProgressTodos = allTodoLists.filter(item => !item.done);
        const doneTodos = allTodoLists.filter(item => item.done);

        resolve({inProgressTodos, doneTodos});
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

export const updateTodoList = todolist =>
  new Promise(async (resolve, reject) => {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        // get todolist using specific ID
        const updatingTodoList = realm.objectForPrimaryKey(
          TODOLIST_SCHEMA,
          todolist._id,
        );
        updatingTodoList.name = todolist.name;
        updatingTodoList.updatedOn = todolist.updatedOn;
        updatingTodoList.done = todolist.done;
        resolve(updatingTodoList);
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteTodoList = todolistId =>
  new Promise(async (resolve, reject) => {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        // get todolist using specific ID
        const deletingTodoList = realm.objectForPrimaryKey(
          TODOLIST_SCHEMA,
          todolistId,
        );
        realm.delete(deletingTodoList);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteAllTodoList = () =>
  new Promise(async (resolve, reject) => {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        // get all records of TodoList
        const allTodoLists = realm.objects(TODOLIST_SCHEMA);
        realm.delete(allTodoLists);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });

const realm = new Realm(databaseOptions);

export default realm;

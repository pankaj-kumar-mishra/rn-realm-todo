import {Realm, createRealmContext} from '@realm/react';

// Define all schemas
export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';
export const realmId = () => new Realm.BSON.ObjectId();

export type RealmIdType = Realm.BSON.ObjectId;

export class TodoList extends Realm.Object {
  _id!: RealmIdType;
  name!: string;
  done!: boolean;
  createdOn!: Date;
  updatedOn!: Date;

  // the TodoList.generate() method creates Task objects with fields with default values
  static generate(name: string) {
    const currDate = new Date();

    return {
      _id: realmId(),
      name,
      done: false,
      createdOn: currDate,
      updatedOn: currDate,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: TODOLIST_SCHEMA,
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      done: {type: 'bool', default: false},
      createdOn: 'date',
      updatedOn: 'date',
    },
  };
}

const config = {
  schema: [TodoList],
};

export default createRealmContext(config); // exported as TodoListContext

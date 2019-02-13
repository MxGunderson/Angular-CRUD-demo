import { Injectable } from '@angular/core';

//hard coded, will load everytime page refreshes
let TODOS = [
  {
    title: 'Finish all homework',
    time: '11:59pm',
    description: 'You got this',
    isDone: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  get(query = '') {
    return new Promise(resolve => {
      let data;
      if (query === 'completed' || query === 'active') {
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = TODOS;
      }
      resolve(data);
    });
  }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }
  put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].title = changed.title;
      resolve(changed);
    });
  }
  putTime(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].time = changed.time;
      resolve(changed);
    });
  }
  putDescription(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].description = changed.description;
      resolve(changed);
    });
  }

  //add the method
  delete(selected) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone);
      resolve(TODOS);
    });
  }

}

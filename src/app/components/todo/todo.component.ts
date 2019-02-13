//imported service, provided todoService,
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private newTime;
  private newDescription;
  private path;

  //loading the service via constructor
  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  //service method located in todo.service.ts
  getTodos(query = '') {
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
    });
  }

  //grabbing values from the input form
  //service method located in todo.service.ts
  addTodo() {
    this.todoService.add({ title: this.newTodo, time: this.newTime, description: this.newDescription, isDone: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = '';
      this.newTime = '';
      this.newDescription = ''; // clear input form value
    });
  }

  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }
  updateTime(todo, newValue) {
    todo.time = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }
  updateDescription(todo, newValue) {
    todo.description = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }


  //function to destroy listed items
  destroyTodo(todo) {
    this.todoService.delete(todo).then(() => {
      return this.getTodos();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

}

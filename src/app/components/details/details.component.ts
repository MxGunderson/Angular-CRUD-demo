import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [TodoService]
})
export class DetailsComponent implements OnInit {
  private todos
  private activeTasks;

  constructor(private todoService: TodoService) { }

  getTodos() {
    return this.todoService.get().then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
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
  destroyTodo(todo) {
    this.todoService.delete(todo).then(() => {
      return this.getTodos();
    });
  }
  ngOnInit() {
    this.getTodos();
  }

}

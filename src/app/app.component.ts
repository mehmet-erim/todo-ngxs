import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { Store, Select } from '@ngxs/store';
import { AddTodo, RemoveTodo } from './actions/todo.action';
import { TodoStateModel, TodoState } from './states/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  todo: string;
  title = 'ngxs';

  @Select(TodoState.getTodos)
  todos$: Observable<Todo>;

  constructor(private store: Store) {
  }

  addTodo() {
    if (this.todo) {
      const model: Todo = {
        name: this.todo,
        checked: false,
        id: null
      };

      this.store.dispatch(new AddTodo(model));

      this.todo = '';
    }
  }

  removeTodo(id) {
    this.store.dispatch(new RemoveTodo(id));
  }
}

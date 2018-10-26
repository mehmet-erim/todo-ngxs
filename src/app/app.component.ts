import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo, TodoCheckModel } from './models/todo.model';
import { Store, Select } from '@ngxs/store';
import { AddTodo, RemoveTodo, CheckTodo, SubmitTodoForm } from './actions/todo.action';
import { TodoState } from './states/todo.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {
  todo: string;
  destroy$ = new Subject<void>();
  todoForm: FormGroup;

  @Select(TodoState.getTodos)
  todos$: Observable<Todo>;

  constructor(private store: Store, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
    });
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

  onChangeTodoCheck(event: boolean, id: string) {
    const model: TodoCheckModel = {
      checked: event,
      id: id,
    };

    this.store.dispatch(new CheckTodo(model));
  }

  get isTodoFormValid(): boolean {
    return this.todoForm.status === 'VALID';
  }

  onSubmit() {
    if (this.isTodoFormValid) {
      this.store.dispatch(new SubmitTodoForm());
      this.todoForm.reset();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}

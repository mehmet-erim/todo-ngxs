import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo, TodoStatusModel } from './models/todo.model';
import { Store, Select } from '@ngxs/store';
import { AddTodo, RemoveTodo, CheckTodo, SubmitTodoForm, GetMockData } from './actions/todo.action';
import { TodoState } from './states/todo.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {
  todo: string;
  destroy$ = new Subject<void>();
  todoForm: FormGroup;

  isSelectCompleted = false;

  @Select(TodoState.getTodos)
  todos$: Observable<Todo[]>;

  completedTodos$: Observable<Todo[]>;

  completedTodos: Todo[];

  constructor(private store: Store, private fb: FormBuilder) {
    this.completedTodos$ = this.todos$.pipe(map(list => list.filter(s => s.completed)));

    this.todos$.subscribe(todos => {
      console.warn(todos);
      this.completedTodos = todos;
    });
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
        completed: false,
        id: null
      };

      this.store.dispatch(new AddTodo(model));

      this.todo = '';
    }
  }

  removeTodo(id) {
    this.store.dispatch(new RemoveTodo(id));
  }

  onChangeTodoStatus(event: boolean, id: string) {
    const model: TodoStatusModel = {
      completed: event,
      id: id,
    };

    this.store.dispatch(new CheckTodo(model));
  }

  get isTodoFormValid(): boolean {
    return this.todoForm.status === 'VALID';
  }

  onSubmit() {
    if (this.isTodoFormValid) {
      this.store.dispatch(new SubmitTodoForm()).subscribe((res) => {
        console.log(res);
        this.todoForm.reset();
      });
    }
  }

  getMock() {
    this.store.dispatch(new GetMockData());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}

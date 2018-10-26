import { Todo } from '../models/todo.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddTodo, RemoveTodo, CheckTodo, SubmitTodoForm } from '../actions/todo.action';
import { UUID } from 'angular2-uuid';

export class TodoStateModel {
  todos: Todo[];
  todoForm: any;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [{
      name: 'My Initial Todo',
      id: UUID.UUID(),
      checked: true
    }],
    todoForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})

export class TodoState {
  constructor() { }
  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Action(AddTodo)
  add({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    const state = getState();

    const index = state.todos.findIndex(s => s.name.toLocaleLowerCase() === payload.name.toLocaleLowerCase());

    if (index > -1) {
      return;
    }

    payload = {
      ...payload,
      id: UUID.UUID()
    };

    patchState({
      todos: [...state.todos, payload]
    });
  }

  @Action(RemoveTodo)
  remove({ getState, patchState }: StateContext<TodoStateModel>, { payload }: RemoveTodo) {
    const state = getState();

    patchState({
      todos: getState().todos.filter(s => s.id !== payload)
    });
  }

  @Action(CheckTodo)
  check({ getState, patchState }: StateContext<TodoStateModel>, { payload }: CheckTodo) {
    const state = getState();

    const data = state.todos.find(s => s.id === payload.id);

    if (data.checked !== payload.checked) {
      const index = state.todos.findIndex(s => s.id === payload.id);

      const model: Todo = {
        name: data.name,
        checked: payload.checked,
        id: data.id
      };

      patchState({
        todos: [
          ...state.todos.slice(0, index),
          model,
          ...state.todos.slice(index + 1),
        ]
      });
    }

  }

  @Action(SubmitTodoForm)
  submitForm({ getState, patchState }) {
    const state = getState();
    let model = state.todoForm.model;

    const index = state.todos.findIndex(s => s.name.toLocaleLowerCase() === model.name.toLocaleLowerCase());

    if (index > -1) {
      return;
    }

    model = {
      ...model,
      id: UUID.UUID()
    };

    patchState({
      todos: [...state.todos, model]
    });
  }
}

import { Todo } from '../models/todo.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddTodo, RemoveTodo } from '../actions/todo.action';
import { UUID } from 'angular2-uuid';

export class TodoStateModel {
  todos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [{
      name: 'My Initial Todo',
      id: UUID.UUID(),
      checked: false
    }]
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
}

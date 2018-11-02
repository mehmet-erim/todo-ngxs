import { Todo } from '../models/todo.model';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { AddTodo, RemoveTodo, CheckTodo, SubmitTodoForm, GetMockData } from '../actions/todo.action';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../service/user.service';

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
      completed: true
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
  constructor(private http: HttpClient, private u:UserService) { }

  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  // @Selector()
  // static getCompletedTodos(state: TodoStateModel) {
  //   return state.todos.filter(s => s.completed === true);
  // }

  static getCompletedTodos(status: boolean) {
    return createSelector([TodoState], (state: TodoStateModel) => {
      return state.todos.filter(s => s.completed === status);
    });
  }

  @Action(AddTodo)
  add({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    const state = getState();

    const url = "https://jsonplaceholder.typicode.com/todo";

    this.u.getUsers(url).subscribe(
        
       data => {
         if(data){
               // 200 and has data
         } else {
               // 200 but ddata
         }
       },
       error => {
           // 
           console.log(error);
           console.log(error.message);
           console.log(error.status); // code

             
           debugger;
       }
     )




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

    if (data.completed !== payload.completed) {
      const index = state.todos.findIndex(s => s.id === payload.id);

      const todos = [
        ...state.todos.slice(0, index),
        {
          name: data.name,
          completed: payload.completed,
          id: data.id
        },
        ...state.todos.slice(index + 1),
      ];

      patchState({
        todos: todos
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

  @Action(GetMockData)
  getMockData({ getState, patchState }: StateContext<TodoStateModel>) {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Accept', 'application/json');

    this.http.get('https://jsonplaceholder.typicode.com/todos', { headers: header }).pipe(tap((res: any[]) => {
      const random = Math.round(Math.random() * (res.length - 10));
      const state = getState();

      let todos = [];
      for (let i = random; i < random + 10; i++) {
        const el = res[i];
        const model: Todo = {
          name: el.title,
          id: el.id,
          completed: el.completed
        };
        todos = [...todos, model];
      }
      patchState({
        todos: [...state.todos, ...todos]
      });
    })).subscribe();
  }
}

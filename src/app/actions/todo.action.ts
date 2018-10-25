import { Todo, TodoCheckModel } from '../models/todo.model';

export class AddTodo {
  static readonly type = '[TODO] Add';

  constructor(public payload: Todo) { }
}

export class RemoveTodo {
  static readonly type = '[TODO] Remove';

  constructor(public payload: string) { }
}

export class CheckTodo {
  static readonly type = '[TODO] Check';

  constructor(public payload: TodoCheckModel) { }
}

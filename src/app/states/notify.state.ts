import { HttpClient } from "@angular/common/http";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { NotifyMessage, GetUserData } from "../actions/notify.action";

@State<any>({
    name: 'notify',
    defaults: {
      notify: {
        message: 'Success',
        code:  1
      }
  }
})
  
export class NotifyState {
    constructor() { }


    @Selector()
    static getNotify(state: any) {
      return state.notify;
    }





    @Action(GetUserData)
    add({ getState, patchState }: StateContext<any>, { payload }: NotifyMessage) {
     const state = getState();

      payload = {
        ...payload,
        id: 1001
      };
  
      patchState({
        message: [...state.message, payload]
      });
    }

}
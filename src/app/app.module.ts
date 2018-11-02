import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TodoState } from './states/todo.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { DecoratorTutorialComponent } from './decorator-tutorial/decorator-tutorial.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifyComponent } from './common/notify/notify.component';
import { NotifyState } from './states/notify.state';

@NgModule({
  declarations: [
    AppComponent,
    DecoratorTutorialComponent,
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoState, NotifyState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { Button } from 'primeng/button';
import { PostTable } from './views/post-table/post-table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PostForm } from './views/post-form/post-form';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    PostTable,
    PostForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Button,
    HttpClientModule,
    GraphQLModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    MessageService
  ],
  
  bootstrap: [App]
})
export class AppModule { }

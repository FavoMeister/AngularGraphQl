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

@NgModule({
  declarations: [
    App,
    PostTable
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Button,
    HttpClientModule,
    GraphQLModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule
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

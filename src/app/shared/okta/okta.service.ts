import { Injectable } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';

@Injectable({
  providedIn: 'root'
})
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://oktahost',
      clientId: 'asdasdfasdfas',
      redirectUri: 'http://localhost:4200'
    });
  }

  getWidget() {
    return this.widget;
  }
}

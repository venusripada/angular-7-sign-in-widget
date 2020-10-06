import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Okta } from './shared/okta/okta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user;
  oktaSignIn;

  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef) {
    this.oktaSignIn = okta.getWidget();
  }

  showLogin(): void {
    console.log("rendering widget");
    console.log(this.oktaSignIn);
    console.log(document.getElementById("okta-login-container"));
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response) => {
      if (response.status === 'SUCCESS') {
        this.user = response.tokens.idToken.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  ngOnInit(){
    
  }
  async ngAfterViewInit(): Promise<void> {
    try {
      console.log("trying to init")
      this.user = await this.oktaSignIn.authClient.token.getUserInfo();
    } catch (error) {
      this.showLogin();
    }
  }

  logout(): void {
    this.oktaSignIn.authClient.signOut(() => {
      this.user = undefined;
      this.showLogin();
    });
  }
}

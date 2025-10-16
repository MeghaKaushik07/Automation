import { Page } from '@playwright/test';
/*
This function will confirm a sucessfull login to the application then continue to the next page.
*/


export class LoginPage {
  constructor(private page: Page) {}

  async gotoLoginPage(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.fill('#email', username);
    await this.page.fill('input[name="PASSWORD"]', password);
    await this.page.click('//button[@type="submit"]');
  }
}

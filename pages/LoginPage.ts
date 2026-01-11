import { Page, Locator } from '@playwright/test'
import { hightLightAndScreenshot } from '../utils/screenshot';

export class LoginPage {
    // locator
    readonly page: Page;  // Page object giúp tương tác với trang web
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    // verify login thành công

    // function: login, validate
    constructor(page: Page) { // hàm khởi tạo
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.locator('button[type="submit"]')
    }

    async login(username: string, password: string): Promise<void> {
        // đợi vài giây để load trang - networkidle
        // await this.page.waitForLoadState('networkidle')
        // B1: navigate vào web page login
        // await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }
        )

        // đợi đến khi các input xuất hiện
        await this.usernameInput.waitFor({timeout: 10000})

        // B2: fill username vào input
        await this.usernameInput.fill(username)
        await hightLightAndScreenshot(this.page, this.usernameInput, 'loginTest', 'fill_username')

        // B3: fill password vào input
        await this.passwordInput.fill(password)
        await hightLightAndScreenshot(this.page, this.passwordInput, 'loginTest', 'fill_password')

        // B4: enter nút login
        await hightLightAndScreenshot(this.page, this.loginButton, 'loginTest', 'click_login_btn')
        await this.loginButton.click()
    }

    async isLoginSuccessfull(): Promise<boolean> {
        // case 1: test URL có chữ dashboard
        // let url = this.page.url();
        // return url.includes("dashboard")
        try {
            await this.page.waitForURL(/.*dashboard/, { timeout: 3000 });
            return true;
        } catch (e) {
            return false;
        }
    }
}
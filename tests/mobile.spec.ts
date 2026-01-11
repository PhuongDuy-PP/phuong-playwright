import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'

// describe: tạo cụm test case
test.describe("Mobile Login Tests", () => {
    test("Test login success", async ({page}) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
        const loginPage = new LoginPage(page)

        await loginPage.login('Admin', 'admin123')

        await loginPage.isLoginSuccessfull()
    })

    test("Test login failed", async ({page}) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
        const loginPage = new LoginPage(page)

        await loginPage.login('wronguser', 'wrongpass')

        await loginPage.isLoginSuccessfull() === false
    })
})
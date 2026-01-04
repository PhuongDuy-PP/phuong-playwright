import { expect, test } from '@playwright/test'
import { LoginData, readFileFromCsv } from '../utils/csvReader'
import { LoginPage } from '../pages/LoginPage'

const testData: LoginData[] = readFileFromCsv()

test.describe('Login Data from CSV', () => {
    for (const data of testData) {
        test(`${data.description}`, async ({ page }) => {
            const loginPage = new LoginPage(page)

            await loginPage.login(data.username, data.password)

            if (data.expected_result === 'success') {
                expect(await loginPage.isLoginSuccessfull()).toBeTruthy()
            } else {
                expect(await loginPage.isLoginSuccessfull()).toBeFalsy()
            }
        })
    }
})
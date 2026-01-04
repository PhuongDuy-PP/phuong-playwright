import {test, expect} from '@playwright/test'
import { LoginData, readFileFromCsv } from '../utils/csvReader'
import { LoginPage } from '../pages/LoginPage'

test.describe("Login Data from CSV", () => {
    let testData: LoginData[] = []
    // đọc file csv dùng beforeAll()
    test.beforeAll(async () => {
        testData = await readFileFromCsv()

        // nên thêm log để kiểm tra xem đã load thành công data chưa
        console.log(`Đã load ${testData.length} dòng dữ liệu từ file CSV`)
    })

    for (let data of testData) {
        test(`Login: ${data.username}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            await loginPage.login(data.username, data.password)
            const isSuccess = await loginPage.isLoginSuccessfull()

            if (data.expected_result === 'success') {
                expect(isSuccess).toBe(true)
            } else {
                expect(isSuccess).toBe(false)
            }
        })
    }

    // test("Test data", async ({page}) => {
    //     // do testData là list nên dùng for để lặp qua từng dòng dữ liệu
    //     for (let data of testData) {
    //         console.log(data.username)
    //         const loginPage = new LoginPage(page)
    //         await loginPage.login(data.username, data.password)

    //         // kiểm tra kết quả
    //         if(data.expected_result === 'success') {
    //             await loginPage.isLoginSuccessfull()
    //             await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout")
    //         }
    //         else {
    //             await loginPage.isLoginSuccessfull() === false
    //         }
    //     }
    // })
})
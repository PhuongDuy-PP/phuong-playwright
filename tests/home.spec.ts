import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

test.describe("Home Page tests", () => {
    // Setup môi trường
    // 1. Login với account
    // 2. goto page Home
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)

        // Login
        await loginPage.login("Admin", "admin123")

        // đợi đến khi trang Home xuất hiện
        // => check URL của trang Home (có "dashboard" xuất hiện)
        // **: không quan tâm giá trị là gì
        // đằng trước hay đằng sau của dashboard ko quan trọng
        await page.waitForURL("**/dashboard**", {timeout: 10000})

        // đợi đến khi menu items xuất hiện
        await homePage.sidebarMenuNames.first().waitFor({timeout: 10000})
    })

    test("Verify các menu có đầy đủ không", async ({page}) => {
        const homePage = new HomePage(page)

        const menuItems = await homePage.getSidebarMenuItems()

        // kiểm tra
        // case 1: menuItems > 0
        expect(menuItems.length).toBeGreaterThan(0)
        // case 2: menuItems có chứa các giá trị mong muốn
        // kiểm tra menu Admin có tồn tại trong menuItems không
        expect(menuItems).toContain("Admin")
        // case 3: kiểm tra menuItems có đầy đủ các giá trị mong muốn không
    })
})
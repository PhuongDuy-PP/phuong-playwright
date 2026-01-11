import {test, expect} from '@playwright/test'
import { readFileSync } from 'fs'
import path, { join } from "path";
import { fileURLToPath } from 'url'
import { hightLightAndScreenshot } from '../utils/screenshot';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test.describe("Test getByRole với HTML local", () => {
    // setup load file HTML trước mỗi test case
    test.beforeEach(async ({page}) => {
        // B1: đọc file HTML từ folder public
        const htmlPath = join(__dirname, "..", "public", "index.html")
        // B2: set file HTML vào page playwright
        const htmlContent = readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'})
    })

    // test case 1: button
    test("Test button", async ({page}) => {
        // <button type="submit" class="btn-primary" aria-label="Submit form button">
        //             Submit
        //         </button>
        const submitBtn = page.getByRole('button', {name: 'Submit'})
        await expect(submitBtn).toBeVisible()

        const cancelBtn = page.getByRole('button', {name: 'Cancel'})
        await expect(cancelBtn).toBeVisible()

        await page.waitForTimeout(2000)
    })

    test("Test input", async ({page}) => {
        // <input 
        //     type="text" 
        //     id="username" 
        //     name="username" 
        //     placeholder="Nhập username"
        //     aria-label="Username input field"
        // >
        const usernameInput = page.getByRole("textbox", {name: "username"})
        await expect(usernameInput).toBeVisible()

        await page.waitForTimeout(2000)
    })

    test("dropdown select", async ({page}) => {
        // <select id="country" name="country" aria-label="Country selection">
        //     <option value="">-- Select --</option>
        //     <option value="vn">Vietnam</option>
        //     <option value="us">United States</option>
        //     <option value="uk">United Kingdom</option>
        // </select>
        const countrySelect = page.getByRole("combobox", {name: "country"})
        await hightLightAndScreenshot(page, countrySelect, "getByRole", "countrySelect")
        await expect(countrySelect).toBeVisible()

        await countrySelect.selectOption({label: "Vietnam"})
        await expect(countrySelect).toHaveValue("vn")

        await page.waitForTimeout(2000)
    })

    test("Test checkbox", async({page}) => {
        // <label>
        //     <input 
        //         type="checkbox" 
        //         id="agree" 
        //         name="agree"
        //         aria-label="Agree to terms checkbox"
        //     >
        //     Tôi đồng ý với điều khoản
        // </label>
        const agreeCheckbox = page.getByRole("checkbox", {name: "agree"})
        await expect(agreeCheckbox).toBeVisible()

        await agreeCheckbox.check()
        await expect(agreeCheckbox).toBeChecked()

        await page.waitForTimeout(2000)
    })

    test("Test radio", async({page}) => {
        // <label>
        //     <input 
        //         type="radio" 
        //         id="male" 
        //         name="gender" 
        //         value="male"
        //         aria-label="Male gender option"
        //     >
        //     Nam
        // </label>
        const maleRadio = page.getByRole("radio", {name: "male"}).first()

        await expect(maleRadio).toBeVisible()

        maleRadio.check()
        await expect(maleRadio).toBeChecked()
    })

    test("Test table", async({page}) => {
        // <table role="table">
        //         <thead>
        //             <tr>
        //                 <th scope="col">ID</th>
        //                 <th scope="col">Name</th>
        //                 <th scope="col">Email</th>
        //                 <th scope="col">Role</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>1</td>
        //                 <td>John Doe</td>
        //                 <td>john@example.com</td>
        //                 <td>Admin</td>
        //             </tr>
        //             <tr>
        //                 <td>2</td>
        //                 <td>Jane Smith</td>
        //                 <td>jane@example.com</td>
        //                 <td>User</td>
        //             </tr>
        //             <tr>
        //                 <td>3</td>
        //                 <td>Bob Johnson</td>
        //                 <td>bob@example.com</td>
        //                 <td>Manager</td>
        //             </tr>
        //         </tbody>
        //     </table>

        const table = page.getByRole("table")
        await expect(table).toBeVisible()

        // kiểm tra data trong table
        const johnRow = table.getByRole("cell", {name: "John Doe"})
        await expect(johnRow).toBeVisible()

        // kiểm tra trong table có bao nhiêu data
        const rows = table.getByRole("row")
        let countRow = await rows.count()
        await expect(countRow).toEqual(4) // 1 header + 3 data
    })

    test("Test link", async({page}) => {
        const navigation = page.getByRole("navigation")
        await expect(navigation).toBeVisible()

        const homeLink = navigation.getByRole("link").filter({hasText: "Home"}).first()
        await expect(homeLink).toBeVisible()
    })
})
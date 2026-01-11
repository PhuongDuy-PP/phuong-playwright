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
})
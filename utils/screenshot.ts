// B1: highlight element trên trang web
// B2: chụp ảnh màn hình và lưu vào file

import { Locator, Page } from "@playwright/test";
import { mkdirSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// nhận các tham số
// param1: page -> object Page của playwright
// param2: locator -> object Locator của playwright
// param3: testName -> để đặt folder lưu hình có highlight
// param4: stepName -> để đặt tên file hình chụp

export async function hightLightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string
): Promise<void>{
    // B1: tạo tên folder
    const folderName = testName.toLowerCase()

    // B2: tạo đường dẫn để lưu folder
    // __dirname: thư mục (folder) chứa file code
    // .. : quay lên thư mục cha
    const screenshotDir = join(__dirname, "..", "screenshot", folderName)


    // B3: tạo folder
    mkdirSync(screenshotDir, {recursive: true})

    // B4: highlight element
    await locator.evaluate((el) => {
        // thêm viền đỏ
        (el as HTMLElement).style.border = "4px solid red";
        // thêm màu nền: vàng
        (el as HTMLElement).style.backgroundColor = "yellow";
    })
    await page.waitForTimeout(1000)

    // B5: chụp ảnh màn hình và lưu vào file
    const filePath = join(screenshotDir, `${stepName}.png`)
    await page.screenshot({path: filePath})
}
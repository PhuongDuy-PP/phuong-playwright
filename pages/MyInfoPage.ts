// private final By avatarWrapper = By.cssSelector(".orangehrm-edit-employee-image-wrapper");
// private  final By uploadBtn = By.cssSelector("button.employee-image-action");
// private final By fileInput = By.cssSelector("input[type='file']");

import {Page, Locator} from '@playwright/test'
import { join } from 'path';

export class MyInfoPage {
    readonly page: Page;

    // locator
    readonly avatarWrapper: Locator;
    readonly uploadBtn: Locator;
    readonly fileInput: Locator;

    constructor(page: Page) {
        this.page = page

        this.avatarWrapper = page.locator(".orangehrm-edit-employee-image-wrapper")
        this.uploadBtn = page.locator("button.employee-image-action")
        this.fileInput = page.locator("input[type='file']")
    }

    // handle upload avatar
    async uploadAvatar(): Promise<void> {
        // click vào avatar
        await this.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 })
        await this.avatarWrapper.click()
        await this.page.waitForTimeout(2000)

        // click vào nút upload
        await this.uploadBtn.waitFor({state: 'visible', timeout: 10000})
        await this.uploadBtn.click()
        await this.page.waitForTimeout(2000)

        // chọn hình và upload hình
        await this.fileInput.waitFor({state: 'attached', timeout: 10000})

        const filePath = join(__dirname, "..", "data", "testing09.png")
        await this.fileInput.setInputFiles(filePath)
        await this.page.waitForTimeout(5000)
    }
}
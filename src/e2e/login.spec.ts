import { expect, test } from '@playwright/test'

test.describe('User Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/login')
    })
})

test('Login form submits successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:4200/login')

    await page.locator('[formControlName="email"]').fill('amol@gmail.com')
    await page.locator('[formControlName="password"]').fill('Test@12345')
    await page.locator('text=Remember me').click()
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(/home/)
    await expect(page.locator('h1')).toContainText('Welcome to Xoriant')
})
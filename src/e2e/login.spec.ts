import { expect, test } from '@playwright/test'

test.describe('User Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/login')
    })
})

test('Login form submits successfully with valid credentials', async ({ page }) => {
    await page.goto('')

    await page.locator('[formControlName="email"]').fill('testuser@gmail.com')
    await page.locator('[formControlName="password"]').fill('1234567')
    await page.locator('text=Remember me').click()
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(/home/)
    const title = await page.title()
    await expect(title).toBe('Home | MyApp')
})
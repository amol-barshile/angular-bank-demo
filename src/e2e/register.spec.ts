import { expect, test } from '@playwright/test'

test.describe('User Register', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/register')
    })
})

test('user register with valid data', async ({ page }) => {
    await page.goto('')

    await page.locator('[formControlName="name"]').fill('Test User')
    await page.locator('[formControlName="email"]').fill('testuser@gmail.com')
    await page.locator('[formControlName="password"]').fill('1234567')
    await page.getByRole('button', { name: 'Register' }).click()
    await expect(page).toHaveURL(/home/)
    const title = await page.title()
    await expect(title).toBe('Home | MyApp')
})
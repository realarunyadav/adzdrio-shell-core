import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await context.new_page()

        # Auth bypass
        await page.goto("http://localhost:8080")
        await page.evaluate("window.localStorage.setItem('abos_auth_bypass', 'true')")
        await page.goto("http://localhost:8080/modules/admin/ai")
        await page.wait_for_selector("text=AI Foundation", timeout=10000)
        
        print("AI Admin Page loaded.")

        # Check tabs
        tabs = ["Assistant Prototype", "Audit & Governance", "Provider Status"]
        for tab in tabs:
            await page.click(f"text={tab}")
            print(f"Tab '{tab}' verified.")

        # Verify Assistant UI
        await page.click("text=Assistant Prototype")
        await page.wait_for_selector("text=Prototype AI Response")
        await page.fill("placeholder='Enter a question...'", "Test query")
        await page.click("button >> .lucide-send")
        print("Assistant interaction verified.")

        # Check Audit
        await page.click("text=Audit & Governance")
        await page.wait_for_selector("text=AI Audit Log")
        print("Audit view verified.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

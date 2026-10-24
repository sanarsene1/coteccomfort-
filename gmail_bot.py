import asyncio
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async
import random

async def create_account():
    async with async_playwright() as p:
        # Lancement du navigateur (headless=False pour voir ce qui se passe)
        browser = await p.chromium.launch(headless=False)
        
        # On crée un contexte avec un User-Agent aléatoire pour tromper Google
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        
        page = await context.new_page()
        
        # APPLICATION DU STEALTH (Le camouflage)
        await stealth_async(page)
        
        print("Navigation vers la page de création...")
        await page.goto("https://accounts.google.com/signup")

        # Ici, tu dois ajouter les commandes pour remplir les champs :
        # await page.fill('input[name="firstName"]', "Jean")
        # await page.fill('input[name="lastName"]', "Dupont")
        # await page.click('button:has-text("Suivant")')
        
        print("Le bot est lancé. Remplis les champs manuellement pour tester le No-PV !")
        
        # On laisse la page ouverte pour voir si Google demande un téléphone
        await asyncio.sleep(1000) 
        await browser.close()

asyncio.run(create_account())

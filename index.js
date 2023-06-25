const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(){
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()
    await page.goto('https://www.yourdigitalresource.com/blog-categories/brand-development')

    const blogData = await page.evaluate(() => {
        const source = 'https://www.yourdigitalresource.com'
        const results = []

        const elements = document.querySelectorAll('.vert-blog-box')
        elements.forEach((element) => {
            const title = element.querySelector('.rotating-bucket-header').textContent
            const category = element.querySelector('.category-name').textContent
            const author = element.querySelector('.card-author').textContent
            const date = element.querySelector('.post-date').textContent
            const link = source + element.getAttribute('href')

            results.push({ title, category, author, date, link })
        })

        return results
    })

    await fs.writeFile("blog-data.json", JSON.stringify(blogData, null, 2))


    await browser.close()
}

start()
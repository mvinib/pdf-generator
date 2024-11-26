import puppeteer, { PDFOptions } from "puppeteer";
import { engine } from "../../engine";

export async function htmlToPdfBuffer(html: string, options?: PDFOptions): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--single-process',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--hide-scrollbars',
            '--start-fullscreen',
            '--disable-setuid-sandbox',
            '--log-level=debug'
        ],
        timeout: 30000,
    });
    try {
        engine.info("Iniciando geração do template")

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.setContent(html, {
            waitUntil: ["domcontentloaded", "load", "networkidle0", "networkidle2"],
        });

        await page.emulateMediaType("screen")

        const pdfBuffer = await page.pdf(options);

        engine.info("Geração do template finalizada")

        return pdfBuffer
    } catch (error) {
        engine.info("Falha ao gerar template")
        throw error
    } finally {
        browser.close()
    }

}
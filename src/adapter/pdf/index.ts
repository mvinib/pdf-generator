import puppeteer, { PDFOptions } from "puppeteer";
import { engine } from "../../engine";

export async function htmlToPdfBuffer(html: string, options?: PDFOptions & { isDynamicDimensions: boolean }): Promise<Buffer> {
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
        await page.setContent(html, {
            waitUntil: ["domcontentloaded", "load", "networkidle0", "networkidle2"],
        });

        await page.emulateMediaType("screen")

        const contentHeight = await page.evaluate(() => {
            const body = document.querySelector('body');
            return body ? body.scrollHeight : 0;
        });

        const contentWidth = await page.evaluate(() => {
            const body = document.querySelector('body');
            return body ? body.clientWidth : 0;
        });

        const adjustedOptions = {
            ...options,
            ...(options?.isDynamicDimensions && {
                width: `${contentWidth}px`,
                height: `${contentHeight}px`,
            })
        };

        const pdfBuffer = await page.pdf(adjustedOptions);

        engine.info("Geração do template finalizada")

        return pdfBuffer
    } catch (error) {
        engine.info("Falha ao gerar template")
        throw error
    } finally {
        browser.close()
    }
}
const fs = require('fs');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const QR = require('qr-image');
const path = require('path');

exports.generate_compte_rendu = (data, output_path) => {
    const template = fs.readFileSync(path.join(__dirname, "../templates/compte_rendu.html")).toString();
    const qr_code = QR.imageSync(data.id, {type: "png", margin:1});
    data.qr_code = Buffer.from(qr_code).toString("base64");
    render(template, 'A5', data, output_path)
}

exports.generate_arret_de_travail = (data, qr_code, output_path) => {
    const template = fs.readFileSync(path.join(__dirname, "../templates/arret_de_travail.html")).toString();
    data.qr_code = Buffer.from(qr_code).toString("base64");
    render(template, 'A5', data, output_path)
}

exports.generate_ordonnance = (data, qr_code, output_path) => {
    const template = fs.readFileSync(path.join(__dirname, "../templates/ordonnance.html")).toString();
    data.qr_code = Buffer.from(qr_code).toString("base64");
    render(template, 'A5', data, output_path)
}

async function render(template, format, data, output_path){
    const rendered = ejs.render(template, data);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = (await browser.pages())[0];
    await page.setContent(rendered, { waitUntil: "domcontentloaded"});
    await page.pdf({ path: output_path, format: format, printBackground: true });
    browser.close();
}
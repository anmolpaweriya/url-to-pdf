const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: PDF Generation APIs
 */

/**
 * @swagger
 * /generate-pdf:
 *   post:
 *     summary: Generate PDF from a URL
 *     description: |
 *       Accepts a public URL and returns the generated PDF file.
 *       The API renders the page using Puppeteer and converts it into A4 PDF format.
 *     tags: [PDF]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: Publicly accessible webpage URL
 *                 example: https://example.com
 *           examples:
 *             ExampleWebsite:
 *               summary: Generate PDF from example.com
 *               value:
 *                 url: https://example.com
 *             Wikipedia:
 *               summary: Generate PDF from wikipedia
 *               value:
 *                 url: https://www.wikipedia.org
 *     responses:
 *       200:
 *         description: PDF generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: URL is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: URL is required
 *       500:
 *         description: Failed to generate PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to generate PDF
 */

app.post("/generate-pdf", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=generated.pdf",
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    if (browser) await browser.close();
    console.error(error);
    return res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// ---------------------------
// Swagger Configuration
// ---------------------------

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PDF Generator API",
      version: "1.0.0",
      description: "API to generate PDF from a given URL using Puppeteer",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

# 📄 PDF Generator API (Node.js + Puppeteer)

A simple REST API that generates a **PDF from any public webpage URL**
using **Puppeteer**.

------------------------------------------------------------------------

## 🚀 Features

-   Convert any public URL to PDF
-   Returns binary PDF file
-   Swagger UI for interactive testing
-   Docker-ready
-   Production-friendly setup

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Node.js
-   Express
-   Puppeteer
-   swagger-ui-express
-   swagger-jsdoc
-   Docker

------------------------------------------------------------------------

## 📦 Installation

### 1️⃣ Clone Repository

    git clone https://github.com/your-username/pdf-generator-api.git
    cd pdf-generator-api

### 2️⃣ Install Dependencies

    npm install

------------------------------------------------------------------------

## ▶️ Run Locally

Start the server:

    node server.js

Server runs at:

    http://localhost:3000

Swagger documentation available at:

    http://localhost:3000/api-docs

------------------------------------------------------------------------

## 📌 API Endpoint

### POST `/generate-pdf`

Generate a PDF from a given URL.

### Request Body

``` json
{
  "url": "https://example.com"
}
```

### Response

  Status Code   Description
  ------------- ----------------------------
  200           Returns generated PDF file
  400           URL is required
  500           Failed to generate PDF

------------------------------------------------------------------------

## 🧪 Example cURL Request

    curl -X POST http://localhost:3000/generate-pdf \
      -H "Content-Type: application/json" \
      -d '{"url":"https://example.com"}' \
      --output output.pdf

------------------------------------------------------------------------

## 🐳 Docker Usage

### Build Docker Image

    docker build -t url-to-pdf .

### Run Docker Container

    docker run -p 3000:3000 url-to-pdf

The API will be available at:

    http://localhost:3000

------------------------------------------------------------------------

## 🔐 Environment Variables

  Variable   Default   Description
  ---------- --------- -------------
  PORT       3000      Server port

Create a `.env` file if needed:

    PORT=4000

------------------------------------------------------------------------

## ⚠️ Security Considerations

This API loads external URLs using Puppeteer.

For production environments, consider implementing:

-   URL validation
-   SSRF protection
-   Request timeout limits
-   Rate limiting
-   Authentication (JWT or API key)
-   Logging and monitoring

------------------------------------------------------------------------

## 📂 Project Structure

    .
    ├── server.js
    ├── package.json
    ├── Dockerfile
    ├── .dockerignore
    └── README.md

------------------------------------------------------------------------

## 📜 License

MIT License

------------------------------------------------------------------------

## ⭐ Support

If this project helps you, consider giving it a ⭐ on GitHub.

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const XLSX = require('xlsx');

const url = 'https://www.amazon.com/';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Lists to store scraped data
        const productNames = [];
        const prices = [];
        const availability = [];
        const productRatings = [];

        // Extract data from the HTML
        // You need to inspect the website's HTML structure to find the appropriate selectors

        // Example:
        // Extracting product names
        $('.product-name-class').each((index, element) => {
            productNames.push($(element).text().trim());
        });

        // Extracting prices
        $('.price-class').each((index, element) => {
            prices.push($(element).text().trim());
        });

        // Extracting availability
        $('.availability-class').each((index, element) => {
            availability.push($(element).text().trim());
        });

        // Extracting product ratings
        $('.rating-class').each((index, element) => {
            productRatings.push($(element).text().trim());
        });

        // Create an array of objects to store the data
        const data = productNames.map((name, index) => ({
            'Product Name': name,
            'Price': prices[index],
            'Availability': availability[index],
            'Product Rating': productRatings[index],
        }));

        // Create a worksheet and add the data
        const ws = XLSX.utils.json_to_sheet(data);

        // Create a workbook with the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Product Information');

        // Save the workbook to an Excel file
        XLSX.writeFile(wb, 'product_information.xlsx');
    })
    .catch(error => {
        console.error(`Failed to retrieve the webpage: ${error.message}`);
    });

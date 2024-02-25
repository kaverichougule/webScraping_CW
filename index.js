console.log("Web Scraping");
const axios=require("axios");
const cheerio=require("cheerio")
const xlsx=require("xlsx");
let products=[];
const getData=async ()=>{
    try{
        const response=await axios.get("https://www.quikr.com/jobs/frontend-developer+zwqxj1519612219",
        {
            headers:{
                'Content-Type':"text/html"
            }
        });
        // console.log(response.data);
        const $=cheerio.load(response.data)
        // const body=$("body");
        const openingsCard=$("[id]")
        .find("a.job-title")
        .each((index,data)=>{
            products.push({name: $(data).text()});
            // console.log($(data).text());
        })
        // console.log(body);
        console.log(products);

        /**
         * 1.Create a workbook (Excel file)
         * 2.Insert the data into sheet
         * 3.Create a sheet(Excel sheet)
         * 4.Attach the sheet to the file
         * 5.Write the file to filesystem 
         */
        const workbook = xlsx.utils.book_new();
        const sheetData=[
            ["Job Title"],
            
        ];

        const workSheet=xlsx.utils.json_to_sheet(sheetData)
        xlsx.utils.book_append_sheet(workbook,workSheet, "Openings");
        xlsx.writeFile(workbook,'output.xlsx')
    }
    catch(err){
        console.error(err)
    }
}
getData();

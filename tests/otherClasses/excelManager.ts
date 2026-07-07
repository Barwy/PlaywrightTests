import ExcelJS from 'exceljs';

export async function writeToExcelCell(file: string, sheetName: string, cellAddress: string, cellValue: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.addWorksheet(sheetName); //worksheet name.
    sheet.getCell(cellAddress).value = cellValue;
    await workbook.xlsx.writeFile(file); //save file.
}

export async function readeExcelCell(file: string, sheetName: string, cellAddress: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const sheet = workbook.addWorksheet(sheetName);
    const cellValue = sheet?.getCell(cellAddress).value;
    return cellValue;
}

export async function writeExcelRow(file: string, sheetName: string, rowNumber: number, ...cellValues: string[]) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.addWorksheet(sheetName); //worksheet name.
    const row = sheet?.getRow(rowNumber);
    row.values = [...cellValues];
    await workbook.xlsx.writeFile(file); //save file.
}

export async function readExcelRow(file: string, sheetName: string, rowNumber: number) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const sheet = workbook.addWorksheet(sheetName);
    const row = sheet?.getRow(rowNumber);

    //add logic to return an array of cell values in a row.
}



import ExcelJS from 'exceljs';

export async function writeToExcelCell(file: string, sheetName: string, cellAddress: string, cellValue: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.getWorksheet(sheetName); //worksheet name.
    sheet.getCell(cellAddress).value = cellValue;
    await workbook.xlsx.writeFile(file); //save file.
}

export async function readeExcelCell(file: string, sheetName: string, cellAddress: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const sheet = await workbook.getWorksheet(sheetName);
    const cellValue = await sheet?.getCell(cellAddress).value;
    return cellValue;
}

export async function writeExcelRow(file: string, sheetName: string, rowNumber: number, ...cellValues: string[]) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.getWorksheet(sheetName); //worksheet name.
    const row = sheet?.getRow(rowNumber);
    row.values = [...cellValues];
    await workbook.xlsx.writeFile(file); //save file.
}

export async function readExcelRow(file: string, sheetName: string, rowNumber: number) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);
    const sheet = await workbook.getWorksheet(sheetName);
    const row = await sheet?.getRow(rowNumber);
    const cellCount = await row.actualCellCount;
    const rowValues = [];
    for(let i = 0; i < cellCount; i++) {
        let cellVealue = row.getCell(i+1).value;
        rowValues[i] = cellVealue;
    }
    return [...rowValues];
}



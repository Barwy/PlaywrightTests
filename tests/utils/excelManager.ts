import ExcelJS from 'exceljs';

export function writeToExcelCell(file: string, sheetName: string, cellAddress: string, cellValue: string) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.getWorksheet(sheetName); //worksheet name.
    sheet.getCell(cellAddress).value = cellValue;
    workbook.xlsx.writeFile(file); //save file.
}

export function readeExcelCell(file: string, sheetName: string, cellAddress: string): (string | number) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(file);
    const sheet = workbook.getWorksheet(sheetName);
    const cellValue = sheet.getCell(cellAddress).value == null ? "" : String(sheet.getCell(cellAddress).value);
    return cellValue;
}

export function writeExcelRow(file: string, sheetName: string, rowNumber: number, ...cellValues: string[]) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(file); //filename if it is in root, or path if it is not.
    const sheet = workbook.getWorksheet(sheetName); //worksheet name.
    const row = sheet?.getRow(rowNumber);
    row.values = [...cellValues];
    workbook.xlsx.writeFile(file); //save file.
}

export function readExcelRow(file: string, sheetName: string, rowNumber: number): (string | number)[] {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(file);
    const sheet = workbook.getWorksheet(sheetName);
    const row = sheet?.getRow(rowNumber);
    const cellCount = row.actualCellCount;
    const rowValues: (string | number)[] = [];
    for (let i = 0; i < cellCount; i++) {
        rowValues[i] = row.getCell(i + 1).value == null ? "" : String(row.getCell(i + 1).value);
    }
    return rowValues;
}



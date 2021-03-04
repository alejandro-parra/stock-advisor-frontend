//Pantalla de busqueda de stocks

export interface SearchStocksData {
    stocks: StockSearchEntry[]
}

export interface StockSearchEntry {
    id?: number,
    stockCode: string,
    stockName: String,
    companyImage: string
}
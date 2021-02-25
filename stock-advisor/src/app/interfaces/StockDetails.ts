//Pantalla de detalles de stock

import { Operation } from "./MyOperations";

export interface StockDetailsData {
    stockName: string,
    id: number,
    stockCode: string,
    companyImg: string,
    actualPrice: number,
    updateDate: string, //una fecha en string
    graphData: any,
    rateOfPrediction: number, //que tanto va a cambiar
    typeOfPrediction: string, //positive o negative
    myOperations: Operation[]
}

export interface StockGraphData {
    history: StockGraphEntry[]
}

export interface StockGraphEntry {
    time: string, //un string que se pueda convertir en date ejemplo '2018-10-19'
    value: number //valor del stock en ese tiempo
}
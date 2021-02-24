//Pantalla de detalles de stock

import { Operation } from "./MyOperations";

export interface StockDetailsData {
    stockName: string,
    id: number,
    stockCode: string,
    companyImg: string,
    actualPrice: number,
    updateDate: string, //una fecha en string
    graphData: StockGraphData
    rateOfPrediction: number, //que tanto va a cambiar
    typeOfPrediction: string, //alza o baja
    myOperations: Operation[]
}

export interface StockGraphData {
    /* Aqui si ayudenme a ver que pedo jaja
    Lo que si se es que va a haber filtro por:
    - Hora
    - Dia
    - Semana
    - Mes
    - Año */
}
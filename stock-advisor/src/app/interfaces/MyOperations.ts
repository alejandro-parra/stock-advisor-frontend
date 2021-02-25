export interface MyOperationsData {
    activeOperations: Operation[],
    closedOperations: Operation[]
}

export interface Operation {
    operationId: number,
    stockId: number,
    stockCode: string,
    companyImg: string,
    stockName: string,
    creationDate: string,
    amountBought: number,
    closingDate?: string, //disponible cuando se cierre
    status: string, //cerrado o abierto
    startingPrice: number,
    closingPrice?: number, //disponible cuando se cierre
}
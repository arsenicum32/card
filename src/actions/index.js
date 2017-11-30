// отрисовать chart

export const chart = chart=> ({type: "chart", chart})

// выдать ошибку соединения с сервером

export const ERROR = error=> ({type: "error", error})

// поставить данные в chart

export const datachart = chart=> ({type: "datachart", chart})

// отрисовать основную инфомрацию

export const MAIN = tb=> ({type: "main", tb})

// отрисовать фильтры для таблицы

export const TABLE = table=> ({type: "table", table })

// вкл/выкл линии

export const Line = i=> {
  return {type: "line", i}
}

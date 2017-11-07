export const setAction = _=> ({type: "setAction"})
export const filter = i=> ({type: "filter", i})
export const mfilter = i=> ({type: "mfilter", i})
export const chart = chart=> ({type: "chart", chart})
export const ERROR = error=> ({type: "error", error})
export const datachart = chart=> ({type: "datachart", chart})
export const MAIN = tb=> ({type: "main", tb})
export const TABLE = table=> ({type: "table", table })
export const Line = i=> {
  return {type: "line", i}
}

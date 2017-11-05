export const setAction = _=> ({type: "setAction"})
export const filter = i=> ({type: "filter", i})
export const mfilter = i=> ({type: "mfilter", i})
export const chart = chart=> ({type: "chart", chart})
export const MAIN = ar=> ({type: "main", ...ar})
export const Line = i=> {
  return {type: "line", i}
}

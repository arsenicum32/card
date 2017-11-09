<?php


header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$chartgenerator = function($log = null, $item = null) {
  $points = new Arr();
  for ($i = 0.0; $i < get($log, "length"); $i++) {
    call_method($points, "push", new Object("x", get(get($log, $i), "time"), "y", is(get(get($log, $i), $item)) ? get(get($log, $i), $item) : 0.0));
  }
  return $points;
};

$ar = [ table=> [
    [s=> TRUE, v=> 'загрузок карты', q=> 0 , c=> 'red'],
    [s=> FALSE, v=> 'ср. время работы', q=> 0 , c=> 'blue'],
    [s=> FALSE, v=> 'сформированных МРД', q=> 0 , c=> 'gold'],
    [s=> TRUE, v=> 'загрузок в excel', q=> 0 , c=> 'lightgreen']
  ], chart=> [
    [
      id=> 0,
      name=> "views" ,
      color=> "red" ,
      points=> []
    ],
    [
      id=> 1,
      name=> "online" ,
      color=> "blue" ,
      points=> []
    ],
    [
      id=> 2,
      name=> "newvis" ,
      color=> "gold" ,
      points=> []
    ],
    [
      id=> 3,
      name=> "form" ,
      color=> "lightgreen" ,
      points=> []
    ]
  ]
];

echo json_encode($ar, JSON_UNESCAPED_UNICODE);

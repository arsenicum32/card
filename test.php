<?php
header('Content-Type: application/json;charset=utf-8');
header('charset: utf-8');
header("Access-Control-Allow-Origin: *");

$date = time() - 24*3600;

$res = [
  [
    'загрузок карты',
    $date ,0,0,0
  ],
  [
    'ср. время работы',
    0,0,0,0
  ],
  [

    'сформированных МРД',
    0,0,0,0
  ],
  [
    'загрузок в Excel',
    0,0,0,0
  ]
];
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>

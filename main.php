<?php
include 'conf.php';

if(isset($_GET['from'])){
    $from = $_GET['from'];
    if(isset($_GET['to'])){
        $to = $_GET['to'];
    }else{
        $to = time();
    }
    $q = " WHERE time BETWEEN FROM_UNIXTIME(".$from.") AND FROM_UNIXTIME(".$to.")";
}else{
    $q = "";
}



$q1 = "SELECT l.action,
(select coalesce((SUM(l1.sitetime) / COUNT(l1.sitetime)),0) FROM log l1 WHERE DATE(l1.time) = DATE(Now()) and l1.action=l.action) as today,
(select coalesce((SUM(l1.sitetime) / COUNT(l1.sitetime)),0) FROM log l1 WHERE DATE(l1.time) = DATE(DATE_ADD(Now(), INTERVAL -1 DAY)) and l1.action=l.action) as yesterday,
(select coalesce((SUM(l1.sitetime) / COUNT(l1.sitetime)),0) FROM log l1 WHERE DATE(l1.time) = DATE(DATE_ADD(Now(), INTERVAL -2 DAY)) and l1.action=l.action) as thirdday,
(select coalesce((SUM(l1.sitetime) / COUNT(l1.sitetime)),0) FROM log l1 WHERE DATE(l1.time) between DATE(DATE_ADD(Now(), INTERVAL -7 DAY)) and DATE(Now()) and l1.action=l.action) as week
from log l group by l.action";

$sql = "SELECT * FROM log".$q;
$result = $conn->query($sql);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if ($result->num_rows > 0) {
    // output data of each row
    $stack = array();
    $res = [
      [
        'загрузок карты',
        0,0,0,0
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
      ],
      [$conn->query($q1)]
    ];
    while($row = $result->fetch_assoc()) {
        array_push($stack, [uid=> $row["uid"], time=> strtotime($row["time"]), stime=> $row["sitetime"] , action=> $row["action"],more=> $row["more"]]);
    }
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

$conn->close();

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
      ]
    ];
    while($row = $result->fetch_assoc()) {
        array_push($stack, [uid=> $row["uid"], time=> strtotime($row["time"]), stime=> $row["sitetime"] , action=> $row["action"],more=> $row["more"]]);
    }
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?><html>

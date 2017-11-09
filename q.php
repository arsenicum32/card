<?php

include 'conf.php';

header("Access-Control-Allow-Origin: *");

if( is_null( $_GET["uid"] ) ){
    $conn->close();
    die("no uid passed");
}
if( is_null( $_GET["action"] ) ){
    $conn->close();
    die("no action passed");
}
if( is_null( $_GET["more"] ) ){
    $more = "";
}else{
    $more = "' , '".$_GET["more"];
    $mr = ", more";
}
if( is_null( $_GET["st"] ) ){
    $sitetime = "";
}else{
    $sitetime = "' , '".$_GET["st"];
    $sitetim = ", sitetime";
}

$sql = "INSERT INTO log ( uid , action ". $mr . $sitetim .") VALUES ( '". $_GET["uid"] ."', '" . $_GET["action"] . $more . $sitetime . "' )";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();

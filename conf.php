<?php
$servername = "localhost";
$username = "card";
$password = "0E8k1P6k";
$dbname = "cardbase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

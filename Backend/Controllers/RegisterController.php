<?php
require_once '../Models/User.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->username) && !empty($data->email) && !empty($data->password)) {
        $user = new User();
        $user->name = htmlspecialchars(strip_tags($data->name));
        $user->username = htmlspecialchars(strip_tags($data->username));
        $user->email = htmlspecialchars(strip_tags($data->email));
        $user->password = $data->password; // Will be hashed in User.php

        $response = $user->register();
        echo json_encode(["message" => $response]);
    } else {
        echo json_encode(["message" => "All fields are required!"]);
    }
}
?>

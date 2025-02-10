<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include_once __DIR__ . '/../Models/UserCodeSnipppet.php';
class MoveCodeController{
    private $snippet;

    public function __construct()
    {
        $this->snippet = new UserCodeSnipppet();
    }

    public function moveCode(){
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'], $data['code'], $data['coderName'], $data['difficulty'], $data['averageTime'], $data['status'])) {
            echo json_encode(["error" => "Invalid data"]);
            exit;
        }

        $id = $data['id'];
        $code = $data['code'];
        $coderName = $data['coderName'];
        $difficulty = $data['difficulty'];
        $averageTime = $data['averageTime'];
        $status = $data['status'];


        $response = $this->snippet->moveCodeSnippet($id, $code, $coderName, $difficulty, $averageTime, $status);

        echo json_encode($response);


    }

}

$controller = new MoveCodeController();
$controller->moveCode();
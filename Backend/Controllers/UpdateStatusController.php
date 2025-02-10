<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include_once __DIR__ . '/../Models/UserCodeSnipppet.php';
class UpdateStatusController{
    private $snippet;

    public function __construct()
    {
        $this->snippet = new UserCodeSnipppet();
    }


public function updateStatus(){
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !isset($data['status'])) {
        echo json_encode(["error" => "Invalid data"]);
        exit;
    }

    $id = $data['id'];
    $status = $data['status'];

    $response = $this->snippet->updateStatus($id, $status);

    echo json_encode($response);

}

}

$controller = new UpdateStatusController();
$controller->updateStatus();

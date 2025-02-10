<?php
include_once __DIR__ . '/../Models/User.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
class getUserId
{
    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function getUserId(){
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['username'])) {
            echo ($data['username']);
            echo json_encode(["status" => false, "message" => "Username not provided"]);
            exit;
        }

        $username = $data['username'];
        $userId = $this->user->getUserIdByUsername($username);

        if ($userId) {
            echo json_encode(["status" => true, "user_id" => $userId]);
        } else {
            echo json_encode(["status" => false, "message" => "User not found"]);
        }
    }


}
$controller = new getUserId();
$controller->getUserId();
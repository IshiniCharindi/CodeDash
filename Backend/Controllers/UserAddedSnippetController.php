<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../Models/UserCodeSnipppet.php';

class UserAddedSnippetController
{
    private $snippet;

    public function __construct()
    {
        $this->snippet = new UserCodeSnipppet();
    }

    public function addSnippet()
    {
        // Get raw POST data
        $input = json_decode(file_get_contents('php://input'), true);

//        echo ($_POST['user_id']);
//        echo ($_POST['title']);
//        echo ($_POST['code']);
        if (isset($input['user_id']) && isset($input['title']) && isset($input['code'])) {
            $userId = $input['user_id'];
            $title = $input['title'];
            $code = $input['code'];


             // Just for debugging

            $this->snippet->user_id = $userId;
            $this->snippet->title = $title;
            $this->snippet->code = $code;
            $this->snippet->status = 'pending';

            if ($this->snippet->create()) {
                echo json_encode(["message" => "Snippet added successfully", "status" => true]);
            } else {
                echo json_encode(["message" => "Failed to add snippet", "status" => false]);
            }
        } else {
            echo json_encode(["message" => "Missing data", "status" => false]);
        }
    }

}
$controller = new UserAddedSnippetController();
$controller->addSnippet();

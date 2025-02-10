<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../Models/UserCodeSnipppet.php';
class getUserSnippetsController{
    private $snippet;

    public function __construct()
    {
        $this->snippet = new UserCodeSnipppet();
    }

    public function getUserSnippet(){
        $user_id = $_GET['user_id'];


// Get the snippets for the user
        $unserSnippets = $this->snippet->getUserSnippets($user_id);

// Return the snippets as a JSON response
        echo json_encode(['snippets' => $unserSnippets]);
    }

}
$controller = new getUserSnippetsController();
$controller->getUserSnippet();
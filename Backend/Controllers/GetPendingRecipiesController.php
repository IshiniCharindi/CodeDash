<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once __DIR__ . '/../Models/UserCodeSnipppet.php';
class GetPendingRecipiesController{
    private $snippet;

    public function __construct()
    {
        $this->snippet = new UserCodeSnipppet();
    }

    public function getPendingCodes(){
        $adminSnippets = $this->snippet->getPendingCodeSnippetsWithUserNames();
        echo json_encode(['snippets' => $adminSnippets]);
    }
}
$controller = new GetPendingRecipiesController();
$controller->getPendingCodes();
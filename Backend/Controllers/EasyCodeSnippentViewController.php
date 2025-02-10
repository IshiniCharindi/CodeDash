<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../Models/CodeSnippet.php';

class EasyCodeSnippetViewController
{
    private $codeSnippetModel;

    public function __construct()
    {
        $this->codeSnippetModel = new CodeSnippet();
    }

    public function getEasySnippets()
    {
        header('Content-Type: application/json');
        echo $this->codeSnippetModel->getEasySnippets();
    }
}


$controller = new EasyCodeSnippetViewController();
$controller->getEasySnippets();

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../Models/CodeSnippet.php';

class DifficultCodeSnippetViewController
{
    private $codeSnippetModel;

    public function __construct()
    {
        $this->codeSnippetModel = new CodeSnippet();
    }

    public function getDifficultSnippets()
    {
        header('Content-Type: application/json');
        echo $this->codeSnippetModel->getDifficultSnippets();
    }
}

// Handle API request
$controller = new DifficultCodeSnippetViewController();
$controller->getDifficultSnippets();


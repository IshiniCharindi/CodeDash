<?php
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

// Handle API request
$controller = new EasyCodeSnippetViewController();
$controller->getEasySnippets();

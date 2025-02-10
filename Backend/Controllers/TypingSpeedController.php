<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once __DIR__ . '/../Models/CodeSnippet.php';
include_once __DIR__ . '/../Models/userCompletion.php';

class TypingSpeedController
{
    private $userCompletionModel;
    private $codeSnippetModel;

    public function __construct()
    {
        $this->codeSnippetModel = new CodeSnippet();
        $this->userCompletionModel = new userCompletion();
    }

    public function getAverageTypingSpeed()
    {
        $easySpeed = $this->userCompletionModel->getAverageTimeForEasyLevel() ?: 1;
        $mediumSpeed = $this->userCompletionModel->getAverageTimeForMediumLevel() ?: 1;
        $difficultSpeed = $this->userCompletionModel->getAverageTimeForDifficultLevel() ?: 1;

        $easyWordCount = $this->codeSnippetModel->getEasySnippetsWithWordCount() ?: 0;
        $mediumWordCount = $this->codeSnippetModel->getMediumSnippetsWithWordCount() ?: 0;
        $difficultWordCount = $this->codeSnippetModel->getDifficultSnippetsWithWordCount() ?: 0;


        $easyAvgSpeed = ($easyWordCount / $easySpeed) * 60;
        $mediumAvgSpeed = ($mediumWordCount / $mediumSpeed) * 60;
        $difficultAvgSpeed = ($difficultWordCount / $difficultSpeed) * 60;


        $totalLevels = ($easyAvgSpeed > 0) + ($mediumAvgSpeed > 0) + ($difficultAvgSpeed > 0);
        $totalAverageTypingSpeed = $totalLevels ? ($easyAvgSpeed + $mediumAvgSpeed + $difficultAvgSpeed) / $totalLevels : 0;

        $response = [
            "totalAverageTypingSpeed" => round($totalAverageTypingSpeed, 2)  // Round for cleaner output
        ];

        echo json_encode($response);
    }
}

$controller = new TypingSpeedController();
$controller->getAverageTypingSpeed();

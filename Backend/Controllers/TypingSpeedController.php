<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../error_log.txt');
error_reporting(E_ALL);

include_once __DIR__ . '/../Models/CodeSnippet.php';
include_once __DIR__ . '/../Models/userCompletion.php';
include_once __DIR__ . '/../Models/saveFinalAVG.php';

class TypingSpeedController
{
    private $userCompletionModel;
    private $codeSnippetModel;

    private $final;

    public function __construct()
    {
        $this->codeSnippetModel = new CodeSnippet();
        $this->userCompletionModel = new userCompletion();
        $this->final = new saveFinalAVG();


    }

    public function getAverageTypingSpeed()
    {
        $user_id = $_GET['user_id'];

        $easySpeed = $this->userCompletionModel->getAverageTimeForEasyLevel();
        $mediumSpeed = $this->userCompletionModel->getAverageTimeForMediumLevel();
        $difficultSpeed = $this->userCompletionModel->getAverageTimeForDifficultLevel();

        $easyWordCount = $this->codeSnippetModel->getEasySnippetsWithWordCount();
        $mediumWordCount = $this->codeSnippetModel->getMediumtSnippetsWithWordCount();
        $difficultWordCount = $this->codeSnippetModel->getDifficultSnippetsWithWordCount();


        error_log("Fetched Speeds: Easy=$easySpeed, Medium=$mediumSpeed, Difficult=$difficultSpeed");
        error_log("Fetched Word Counts: Easy=$easyWordCount, Medium=$mediumWordCount, Difficult=$difficultWordCount");


        $easySpeed = is_numeric($easySpeed) && $easySpeed > 0 ? floatval($easySpeed) : null;
        $mediumSpeed = is_numeric($mediumSpeed) && $mediumSpeed > 0 ? floatval($mediumSpeed) : null;
        $difficultSpeed = is_numeric($difficultSpeed) && $difficultSpeed > 0 ? floatval($difficultSpeed) : null;

        $easyWordCount = is_numeric($easyWordCount) ? floatval($easyWordCount) : 0;
        $mediumWordCount = is_numeric($mediumWordCount) ? floatval($mediumWordCount) : 0;
        $difficultWordCount = is_numeric($difficultWordCount) ? floatval($difficultWordCount) : 0;



        if (!$easySpeed && !$mediumSpeed && !$difficultSpeed) {
            echo json_encode(["error" => "Invalid speed values from database"]);
            return;
        }


        $easyAvgSpeed = $easySpeed ? ($easyWordCount / $easySpeed) / 60 : 0;
        $mediumAvgSpeed = $mediumSpeed ? ($mediumWordCount / $mediumSpeed) / 60 : 0;
        $difficultAvgSpeed = $difficultSpeed ? ($difficultWordCount / $difficultSpeed) / 60 : 0;


        $validLevels = ($easyAvgSpeed > 0) + ($mediumAvgSpeed > 0) + ($difficultAvgSpeed > 0);


        $totalAverageTypingSpeed = $validLevels ? ($easyAvgSpeed + $mediumAvgSpeed + $difficultAvgSpeed) / $validLevels : 0;



        error_log("Calculated WPM: Easy=$easyAvgSpeed, Medium=$mediumAvgSpeed, Difficult=$difficultAvgSpeed");
        error_log("Final Typing Speed: $totalAverageTypingSpeed");


        echo json_encode(["totalAverageTypingSpeed" => round($totalAverageTypingSpeed, 2)]);
    }
}

$controller = new TypingSpeedController();
$controller->getAverageTypingSpeed();


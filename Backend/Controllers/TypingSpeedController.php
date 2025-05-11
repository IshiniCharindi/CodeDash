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
        try {
            // Validate user_id exists
            if (!isset($_GET['user_id'])) {
                throw new Exception("User ID not provided");
            }

            $user_id = $_GET['user_id'];

            // Validate user_id is numeric
            if (!is_numeric($user_id)) {
                throw new Exception("Invalid User ID format");
            }

            error_log("Starting calculation for user: $user_id");

            // Get average times
            $easySpeed = $this->userCompletionModel->getAverageTimeForEasyLevel();
            $mediumSpeed = $this->userCompletionModel->getAverageTimeForMediumLevel();
            $difficultSpeed = $this->userCompletionModel->getAverageTimeForDifficultLevel();

            // Get word counts
            $easyWordCount = $this->codeSnippetModel->getEasySnippetsWithWordCount();
            $mediumWordCount = $this->codeSnippetModel->getMediumtSnippetsWithWordCount();
            $difficultWordCount = $this->codeSnippetModel->getDifficultSnippetsWithWordCount();

            error_log("Fetched Speeds: Easy=$easySpeed, Medium=$mediumSpeed, Difficult=$difficultSpeed");
            error_log("Fetched Word Counts: Easy=$easyWordCount, Medium=$mediumWordCount, Difficult=$difficultWordCount");

            // Validate and convert values
            $easySpeed = is_numeric($easySpeed) && $easySpeed > 0 ? floatval($easySpeed) : null;
            $mediumSpeed = is_numeric($mediumSpeed) && $mediumSpeed > 0 ? floatval($mediumSpeed) : null;
            $difficultSpeed = is_numeric($difficultSpeed) && $difficultSpeed > 0 ? floatval($difficultSpeed) : null;

            $easyWordCount = is_numeric($easyWordCount) ? floatval($easyWordCount) : 0;
            $mediumWordCount = is_numeric($mediumWordCount) ? floatval($mediumWordCount) : 0;
            $difficultWordCount = is_numeric($difficultWordCount) ? floatval($difficultWordCount) : 0;

            // Calculate WPM for each level
            $easyAvgSpeed = $easySpeed ? ($easyWordCount / $easySpeed) * 60 : 0; // Changed calculation to words per minute
            $mediumAvgSpeed = $mediumSpeed ? ($mediumWordCount / $mediumSpeed) * 60 : 0;
            $difficultAvgSpeed = $difficultSpeed ? ($difficultWordCount / $difficultSpeed) * 60 : 0;

            error_log("Calculated WPM: Easy=$easyAvgSpeed, Medium=$mediumAvgSpeed, Difficult=$difficultAvgSpeed");

            // Calculate total average
            $validLevels = ($easyAvgSpeed > 0) + ($mediumAvgSpeed > 0) + ($difficultAvgSpeed > 0);
            $totalAverageTypingSpeed = $validLevels ? ($easyAvgSpeed + $mediumAvgSpeed + $difficultAvgSpeed) / $validLevels : 0;

            error_log("Final Typing Speed: $totalAverageTypingSpeed");

            // Save to database
            $saveResult = $this->final->saveFinalAverageTime($user_id, $totalAverageTypingSpeed);

            if (!$saveResult['success']) {
                error_log("Failed to save final average time: " . json_encode($saveResult));
                throw new Exception("Failed to save data: " . $saveResult['message']);
            }

            error_log("Successfully saved data for user $user_id: " . json_encode($saveResult));

            // Return response
            echo json_encode([
                "success" => true,
                "totalAverageTypingSpeed" => round($totalAverageTypingSpeed, 2),
                "saved" => $saveResult['success'],
                "message" => $saveResult['message']
            ]);

        } catch (Exception $e) {
            error_log("Error in TypingSpeedController: " . $e->getMessage());
            echo json_encode([
                "success" => false,
                "error" => $e->getMessage()
            ]);
        }
    }
}

$controller = new TypingSpeedController();
$controller->getAverageTypingSpeed();
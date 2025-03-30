<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once __DIR__ . '/../DbConnector/DbConnector.php';
include_once __DIR__ . '/../Models/saveFinalAVG.php';
class LeaderboardController
{

    public function getTopRankers()
    {
        $leaderboard = new saveFinalAVG();
        $topUsers = $leaderboard->getTopTenUsers();

        echo json_encode($topUsers);
    }
}

$controller = new LeaderboardController();
$controller->getTopRankers();

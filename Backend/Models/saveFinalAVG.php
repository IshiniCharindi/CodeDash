<?php
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class saveFinalAVG{
    private $conn;

    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }
    public function saveFinalAverageTime($user_id, $finalAvgTime)
    {
        try {

            $query = "INSERT INTO finalaveragetime (user_id, finalAvgTime) 
                  VALUES (:user_id, :finalAvgTime)
                  ON DUPLICATE KEY UPDATE finalAvgTime = VALUES(finalAvgTime)";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':finalAvgTime', $finalAvgTime, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return ["success" => true, "message" => "Final average time saved successfully"];
            } else {
                return ["success" => false, "message" => "Failed to save final average time"];
            }
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }
}
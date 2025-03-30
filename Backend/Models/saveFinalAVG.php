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

    public function getTopTenUsers($limit = 10)
    {
        $query = "SELECT u.username, u.id, f.finalAvgTime as score 
              FROM finalaveragetime f
              JOIN userdetails u ON f.user_id = u.id
              ORDER BY f.finalAvgTime DESC
              LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $leaderboard = [];
        $rank = 1;
        foreach ($result as $row) {
            $leaderboard[] = [
                'id' => $rank++,
                'user_id' => $row['id'],
                'name' => $row['username'],
                'score' => round($row['score'], 2),
                'initials' => $this->getInitials($row['username'])
            ];
        }

        return $leaderboard;
    }

    private function getInitials($name)
    {
        $names = explode(' ', $name);
        $initials = '';

        foreach ($names as $n) {
            $initials .= strtoupper(substr($n, 0, 1));
            if (strlen($initials) >= 2) break;
        }

        return $initials;
    }

}
<?php
include_once __DIR__ . '/../DbConnector/DbConnector.php';

class saveFinalAVG {
    private $conn;

    public function __construct() {
        $dbcon = new DbConnector();
        $this->conn = $dbcon->dbConnect();

        // Ensure the table has proper structure (you should run this only once)
        $this->createTableIfNotExists();
    }

    private function createTableIfNotExists() {
        $query = "CREATE TABLE IF NOT EXISTS finalaveragetime (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL UNIQUE,
            finalAvgTime DECIMAL(10,2) NOT NULL,
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES userdetails(id) ON DELETE CASCADE
        ) ENGINE=InnoDB";

        $this->conn->exec($query);
    }

    public function saveFinalAverageTime($user_id, $finalAvgTime) {
        try {
            // Validate inputs
            if (!is_numeric($user_id)) {
                throw new InvalidArgumentException("Invalid user ID");
            }

            if (!is_numeric($finalAvgTime)) {
                throw new InvalidArgumentException("Invalid average time value");
            }

            // Round to 2 decimal places for consistency
            $finalAvgTime = round(floatval($finalAvgTime), 2);

            $query = "INSERT INTO finalaveragetime (user_id, finalAvgTime) 
                      VALUES (:user_id, :finalAvgTime)
                      ON DUPLICATE KEY UPDATE 
                          finalAvgTime = VALUES(finalAvgTime),
                          last_updated = CURRENT_TIMESTAMP";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':finalAvgTime', $finalAvgTime, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $changes = $stmt->rowCount();
                $message = ($changes === 1)
                    ? "New record created successfully"
                    : "Existing record updated successfully";

                return [
                    "success" => true,
                    "message" => $message,
                    "changes" => $changes
                ];
            } else {
                return [
                    "success" => false,
                    "message" => "Failed to save final average time",
                    "error" => $stmt->errorInfo()
                ];
            }
        } catch (PDOException $e) {
            return [
                "success" => false,
                "message" => "Database error",
                "error" => $e->getMessage()
            ];
        } catch (InvalidArgumentException $e) {
            return [
                "success" => false,
                "message" => $e->getMessage()
            ];
        }
    }

    public function getTopTenUsers($limit = 10) {
        try {
            // Validate limit
            $limit = max(1, min(100, (int)$limit));

            $query = "SELECT u.username, u.id, f.finalAvgTime as score 
                      FROM finalaveragetime f
                      JOIN userdetails u ON f.user_id = u.id
                      ORDER BY f.finalAvgTime DESC
                      LIMIT :limit";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
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
        } catch (PDOException $e) {
            error_log("Database error in getTopTenUsers: " . $e->getMessage());
            return [];
        }
    }

    private function getInitials($name) {
        $names = preg_split('/\s+/', trim($name));
        $initials = '';

        foreach ($names as $n) {
            if (!empty($n)) {
                $initials .= strtoupper(substr($n, 0, 1));
                if (strlen($initials) >= 2) break;
            }
        }

        return $initials ?: 'NA';
    }
}
<?php
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class userCompletion
{
    private $conn;
    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }

    public function getAverageTimeForEasyLevel()
    {
        $query = "SELECT avg_time 
                  FROM user_completion 
                  WHERE difficulty_level = 'easy'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return isset($result['avg_time']) ? $result['avg_time'] : 0;
    }

    public function getAverageTimeForMediumLevel()
    {
        $query = "SELECT avg_time 
                  FROM user_completion 
                  WHERE difficulty_level = 'Medium'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return isset($result['avg_time']) ? $result['avg_time'] : 0;
    }

    public function getAverageTimeForDifficultLevel()
    {
        $query = "SELECT avg_time 
                  FROM user_completion 
                  WHERE difficulty_level = 'Difficult'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return isset($result['avg_time']) ? $result['avg_time'] : 0;
    }

}

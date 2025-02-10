<?php
require_once '../DbConnector/DbConnector.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["user_id"]) && isset($data["difficulty_level"]) && isset($data["avg_time"])) {
    $user_id = $data["user_id"];
    $difficulty_level = $data["difficulty_level"];
    $avg_time = $data["avg_time"];

    try {
        $dbcon =new DbConnector();
        $conn= $dbcon->dbConnect();

        // Check if record exists
        $checkQuery = "SELECT * FROM user_completion WHERE user_id = :user_id AND difficulty_level = :difficulty_level";
        $stmt = $conn->prepare($checkQuery);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":difficulty_level", $difficulty_level);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Update existing record
            $updateQuery = "UPDATE user_completion SET avg_time = :avg_time, last_attempted = NOW() WHERE user_id = :user_id AND difficulty_level = :difficulty_level";
            $stmt = $conn->prepare($updateQuery);
        } else {
            // Insert new record
            $insertQuery = "INSERT INTO user_completion (user_id, difficulty_level, avg_time, last_attempted) VALUES (:user_id, :difficulty_level, :avg_time, NOW())";
            $stmt = $conn->prepare($insertQuery);
        }

        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":difficulty_level", $difficulty_level);
        $stmt->bindParam(":avg_time", $avg_time);
        $stmt->execute();

        echo json_encode(["message" => "Completion time saved successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}
?>

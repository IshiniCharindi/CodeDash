<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class CodeSnippet
{
private $conn;


    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }

    public function getEasySnippets()
    {
        try {

            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'easy'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($snippets);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

}
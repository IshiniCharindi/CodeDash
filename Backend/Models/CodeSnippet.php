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

    public function getMediumSnippets()
    {
        try {

            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'Medium'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($snippets);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getDifficultSnippets()
    {
        try {

            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'Difficult'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($snippets);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

    private function getDifficultSnippetsWithWordCount()
    {
        try {
            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'Difficult' ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Calculate total word count
            $totalWordCount = 0;
            $totaltime = 0;
            foreach ($snippets as $snippet) {
                $totalWordCount += str_word_count($snippet['code_snippet']);
                $totalTime += (int) $snippet['average_time'];
            }

            return json_encode([
                "total_word_count" => $totalWordCount,
                "total_time" => $totalTime,
            ]);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

    private function getMediumtSnippetsWithWordCount()
    {
        try {
            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'Medium' ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Calculate total word count
            $totalWordCount = 0;
            $totaltime = 0;
            foreach ($snippets as $snippet) {
                $totalWordCount += str_word_count($snippet['code_snippet']);
                $totalTime += (int) $snippet['average_time'];
            }

            return json_encode([
                "total_word_count" => $totalWordCount,
                "total_time" => $totalTime,
            ]);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

    private function getEasySnippetsWithWordCount()
    {
        try {
            $query = "SELECT id, code_snippet, average_time FROM code_snippets WHERE difficulty_level = 'Easy' ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $totalWordCount = 0;
            $totaltime = 0;
            foreach ($snippets as $snippet) {
                $totalWordCount += str_word_count($snippet['code_snippet']);
                $totalTime += (int) $snippet['average_time'];
            }

            return json_encode([
                "total_word_count" => $totalWordCount,
                "total_time" => $totalTime,
            ]);
        } catch (PDOException $e) {
            return json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }


}
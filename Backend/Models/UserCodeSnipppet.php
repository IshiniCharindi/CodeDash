<?php
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class UserCodeSnipppet {
    private $conn;
    private $table_name = "user_code_snippets";

    public $id;
    public $user_id;
    public $title;
    public $code;
    public $status;
    public $created_at;
    public $updated_at;

    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }

    // Create new snippet
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (user_id, title, code, status) VALUES (:user_id, :title, :code, :status)";

        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":code", $this->code);
        $stmt->bindParam(":status", $this->status);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function getUserSnippets($user_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);

        // Bind user_id
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();

        $snippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $snippets;
    }

    public function getPendingCodeSnippetsWithUserNames() {
        $query = "SELECT ucs.id, ucs.title, ucs.code, ucs.status, ud.name as user_name 
                  FROM " . $this->table_name . " ucs
                  INNER JOIN userdetails ud ON ucs.user_id = ud.id
                  WHERE ucs.status = 'pending'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $pendingSnippets = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $pendingSnippets;
    }
}
?>


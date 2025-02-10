<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class User
{
    private $conn;
    private $table = "userdetails";

    public $name;
    public $username;
    public $email;
    public $password;

    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }

    public function register() {
        if ($this->isUserExist()) {
            return "User already exists!";
        }

        $hashed_password = password_hash($this->password, PASSWORD_DEFAULT);
        $query = "INSERT INTO " . $this->table . " (name, username, email, password) VALUES (:name, :username, :email, :password)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $hashed_password);

        if ($stmt->execute()) {
            return "User registered successfully!";
        }
        return "Error registering user.";
    }

    private function isUserExist() {
        $query = "SELECT * FROM " . $this->table . " WHERE username = :username OR email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function login($username, $password) {
        $query = "SELECT * FROM " . $this->table . " WHERE username = :username LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $user['password'])) {
                return ["status" => true, "message" => "Login successful", "user" => $user];
            }
        }
        return ["status" => false, "message" => "Invalid credentials"];
    }

    public function getUserIdByUsername($username) {
        $stmt = $this->conn->prepare("SELECT id FROM userdetails WHERE username = :username");
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row["id"] : null;
    }

}

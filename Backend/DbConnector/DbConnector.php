<?php
class DbConnector
{
    private $host = 'localhost';
    private $db_name = 'codedash';
    private $username = 'root';
    private $password = '';

    private $port = 3308;

    public function dbConnect()
    {
        try {
            $conn = new PDO("mysql:host=$this->host;dbname=$this->db_name;port=$this->port", $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            return null;
        }
    }
}

?>

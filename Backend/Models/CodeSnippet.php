<?php
include_once __DIR__ . '/../DbConnector/DbConnector.php';
class CodeSnippet
{
private $conn;


    public function __construct()
    {
        $dbcon =new DbConnector();
        $this->conn= $dbcon->dbConnect();
    }

    public function getEasySnippets(){

    }

}
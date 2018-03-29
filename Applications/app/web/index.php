<?php

$queryString = $_SERVER['QUERY_STRING'];

$config = [];
foreach(glob(__DIR__.'/../config/*.php') as $fileName){
    $config = array_merge($config,require($fileName));
}

require_once(realpath(__DIR__.'/../../../vendor/EFrame/App.php'));
$app = new App($config);
$app->run();

?>
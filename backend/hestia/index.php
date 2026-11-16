<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$configured = '__JUHEN_BACKEND_PATH__';
$base = $configured === '__JUHEN_BACKEND_PATH__'
    ? dirname(__DIR__).'/private/backend'
    : $configured;

if (file_exists($maintenance = $base.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $base.'/vendor/autoload.php';

/** @var Application $app */
$app = require_once $base.'/bootstrap/app.php';

$app->handleRequest(Request::capture());

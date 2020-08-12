<?php

if($_SERVER['HTTP_HOST'] == 'localhost:8888') {
    // Environnement de développement
	define("KEY_API_GOOGLE_MAP", "YOUR_KEY_API_GOOGLE_MAP");

} else {
    // Environnement de production
	define("KEY_API_GOOGLE_MAP", getenv('KEY_API_GOOGLE_MAP'));
}
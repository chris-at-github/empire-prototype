<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<title>Cultures</title>

	<link rel="stylesheet" type="text/css" href="/css/screen.css">

	<script type="text/javascript">
		var Cultures = {};
	</script>
</head>
<body>

	<div id="application">
		<cs-map />
	</div>

	<?php echo \App\Helpers\Svg::import('tiles'); ?>
	<?php echo \App\Helpers\Svg::import('objects'); ?>

	<script type="text/javascript">
		Cultures.settings = <?php echo \App\Helpers\Json::encode($settings); ?>;
		Cultures.scene = <?php echo \App\Helpers\Json::encode($scene); ?>;
	</script>
	<script src="/js/cultures.js"></script>
</body>
</html>
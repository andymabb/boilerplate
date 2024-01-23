<?php
$page = basename($_SERVER["PHP_SELF"]);
?>
<!doctype html>
<html class="no-js" lang="en-GB">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <link rel="stylesheet" href="css/style.css">
  <meta name="description" content="">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">
  
  <?php include("inc/favicons.php"); ?>
 
</head>

<body>
<header class="header">
<?php include("inc/header.php"); ?>
<?php include("inc/mainnav.php"); ?>
</header>
 <main class="main">
 <p>Hello world!</p>
 <div style="display:grid; grid-template-columns: repeat(
      auto-fit, 100px); grid-template-rows: 100px;">
   <div style="background-color: var(--primary);">--primary: hsl(265, 38%, 13%);</div>
   <div style="background-color: var(--secondary);">--secondary: hsl(283, 6%, 45%);</div>
   <div style="background-color: var(--tertiary);">--tertiary: hsl(257, 15%, 91%);</div>
   <div style="background-color: var(--light);">--light: hsl(270, 100%, 99%);</div>
   <div style="background-color: var(--accent);">--accent: hsl(278, 100%, 92%);</div>
   <div style="background-color: var(--accent--alt);">--accent--alt: hsl(279, 100%, 97%);</div>
   <div style="background-color: var(--accent--ui);">--accent--ui</div>
 </div>

 </main>

<footer class="footer">
<?php include("inc/footer.php"); ?>   
</footer>
 


</body>

</html>

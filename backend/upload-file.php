<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$DestinationDirectory   = 'pte';
$DirectoryPublicPath = "/pte";

$resut = array('img_path' => '', 'pdf_path' => '');

if (isset($_FILES['MyImg'])){
    $Name = str_replace(' ','-',strtolower($_FILES['MyImg']['name']));
    $Size      = $_FILES['MyImg']['size']; // Obtain original image size
    $TempSrc        = $_FILES['MyImg']['tmp_name']; // Tmp name of image file stored in PHP tmp folder
    $Type      = $_FILES['MyImg']['type']; //Obtain file type, returns
    move_uploaded_file($_FILES["MyImg"]["tmp_name"], $DestinationDirectory. $_FILES["MyImg"]["name"]);
    $result['img_path'] = $DirectoryPublicPath."/".$Name;
    
}
if (isset($_FILES['MyPdf'])){
    $Name = str_replace(' ','-',strtolower($_FILES['MyPdf']['name']));
    $Size      = $_FILES['MyPdf']['size']; // Obtain original image size
    $TempSrc        = $_FILES['MyPdf']['tmp_name']; // Tmp name of image file stored in PHP tmp folder
    $Type      = $_FILES['MyPdf']['type']; //Obtain file type, returns
    move_uploaded_file($_FILES["MyPdf"]["tmp_name"], $DestinationDirectory."/".$_FILES["MyPdf"]["name"]);
    $result['pdf_path'] = $DirectoryPublicPath."/".$Name;
}
echo json_encode($result);
?>
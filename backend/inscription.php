<?php

$_CONFIG['cas_url'] = 'https://cas.utc.fr/cas/';
$ticket = $_GET['ticket'];
$evt_id = $_GET['evt_id'];

$service = 'http://assos.utc.fr/polete/backend/inscription.php?evt_id='.$evt_id;

function authenticate($service, $ticket, $evt_id) {
		global $_CONFIG;
		$url_validate = $_CONFIG['cas_url']."serviceValidate?service=".$service."&ticket=".$ticket."&evt_id=".$evt_id;
		$data = file_get_contents($url_validate);
		if(empty($data)) return -1;
        else 
            return $data;
}

function check_auth($data, $evt_id){

    $pattern = "@.cas:user.(\w*)..cas:user.@";
    
    if (preg_match("/cas:authenticationSuccess/", $data)){
        if( preg_match($pattern, $data, $user)){ 

            $student = $user[1];
            echo $student;

            try{
                $db = new PDO('mysql:host=sql.mde.utc;dbname=polete', 'polete', 'sd6MyD2yhcFqweGe');
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
                echo "mysql connection ok";
            }catch (PDOEXCEPTION $e){
                echo 'connection failed'.$e->getMessage();
            }
            try{
                $statement = "insert into student_by_evt (evt_id, student) values (:evt_id, :student)";
                $q = $db->prepare($statement);
                echo $q->execute(array(':evt_id'=>$evt_id, ':student'=>$student));
                header('Location: /polete/#/inscription/1/'.$evt_id);
            }catch (PDOEXCEPTION $e){
                echo 'insert failed'.$e->getMessage();
                header('Location: /polete/#/inscription/0');
            }
            return $user[0];
        }
        else{
            die();
        }
    }
    else return "fail".$data." ";
}

echo check_auth(authenticate($service, $ticket, $evt_id), $evt_id);
?>

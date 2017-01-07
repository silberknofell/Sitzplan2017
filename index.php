<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Content-type: application/json");
class Gruppe {
	function loadAll($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = $db->exec ( 'SELECT id, bezeichnung FROM gruppe ORDER BY bezeichnung' );
		echo json_encode ( $result );
	}
	function get($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$gruppe = new \DB\SQL\Mapper ( $db, 'gruppe', array('id','bezeichnung', 'extras') );
		$gruppe->load ( array (
				'id=?',
				$f3->get ( 'PARAMS.id' ) 
		) );
		$gruppe->copyTo ( 'POST' );
		echo json_encode ( $f3->get ( 'POST' ) );
	}
	function getFromName($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$gruppe = new \DB\SQL\Mapper ( $db, 'gruppe', array('id','bezeichnung', 'extras') );
		$gruppe->load ( array (
				'bezeichnung=?',
				$f3->get ( 'PARAMS.name' ) 
		) );
		$gruppe->copyTo ( 'POST' );
		echo json_encode ( $f3->get ( 'POST' ) );
	}
	function post($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$gruppe = new \DB\SQL\Mapper ( $db, 'gruppe' );
		
		$inputGruppe = json_decode($f3->get('BODY'));
		$id =  $inputGruppe->id;
		if ($id>0) {
			$gruppe->load(array('id=?',$id));
		}
		$gruppe->copyFrom($inputGruppe);
		$gruppe->save();	
		echo $gruppe->id;
	}
	
	function delete($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$bezeichnung = $f3->get ( 'PARAMS.name' );

		$gruppe = new \DB\SQL\Mapper ( $db, 'gruppe' );
		$gruppe->load ( array ('bezeichnung=?',	$bezeichnung ) 	) ;
		echo ("***".$gruppe->id."***");
		$db->exec('DELETE FROM sus WHERE gruppe_id=?', $gruppe->id);
			
		$result = 
			$db->exec ( 'DELETE FROM gruppe WHERE bezeichnung=?', $bezeichnung);
		echo $result;
	}
}

class Sus {
	function loadAll($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = $db->exec ( 'SELECT * FROM sus ORDER BY nachname, name' );
		
		echo json_encode ( $result );
	}
	function get($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = 
		$db->exec ( 'SELECT * FROM sus WHERE gruppe_id=? ORDER BY nachname, name', $f3->get ( 'PARAMS.gruppe_id' ) );
		echo json_encode ( $result );
	}
	function getlist($f3, $params) {				
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$ids=json_decode($f3->get('BODY'));

		foreach ($ids as $sus_id) {
			$susArray = $db->exec('SELECT * FROM sus WHERE id = ?', $sus_id);
			if (!empty($susArray)) {
				$sus= reset($susArray);
				$result[] = $sus;
			}
		}

		echo json_encode ($result) ;
		
	}
	function post($f3) {

		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$sus = new \DB\SQL\Mapper ( $db, 'sus' );
	
		$inputSus = json_decode($f3->get('BODY'));
		$id = $inputSus->id;
		if ($id >0) {
			$sus->load(array('id=?',$id));
		}
		$sus->copyFrom($inputSus);
		$sus->save();
		echo $sus->id;
	}
	function delete($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = 
		$db->exec ( 'DELETE FROM sus WHERE id=?', $f3->get ( 'PARAMS.id' ) );
		echo $result;
	}
}
class Plaene {
	function loadAllForGroup($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = 
		$db->exec ( 'SELECT id,nr, gruppe, raum,start,stop FROM plan WHERE gruppe_id=? ORDER BY nr DESC', $f3->get ( 'PARAMS.gruppe_id' ) );
		echo json_encode ( $result );		
	}
	
	function get($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = 
		$db->exec ( 'SELECT * FROM plan WHERE id=?', $f3->get ( 'PARAMS.id' ) );
		$plan = reset($result);
		$tischeString = json_decode($plan["tische"]);
		$tische = json_decode($tischeString);

		foreach($tische as $tisch) {
			$sus_id = 0 + $tisch->sus_id;
			$sus_result = $db->exec ( 'SELECT * FROM sus WHERE id=?', $sus_id );
			if (empty($sus_result)) {
				$sus = (object) [];
			} else {
				$sus = (object) reset($sus_result);
			}
			$tisch->sus = $sus;
		}
		$plan["tische"]=$tische;
		echo json_encode ($plan);
	}
	
	function delete($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$result = 
		$db->exec ( 'DELETE FROM plan WHERE id=?', $f3->get ( 'PARAMS.id' ) );
		echo $result;
	}
	
	function post($f3) {
		$db = new \DB\SQL ( 'mysql:host=rdbms.strato.de;port=3306;dbname=DB2566397', 'U2566397', 'Urw16VaX' );
		$plan = new \DB\SQL\Mapper ( $db, 'plan' );

		$inputPlan =  json_decode($f3->get('BODY'));
		$tische = $inputPlan->tische;						
		$inputPlan->tische = json_encode($inputPlan->tische);
		
		$id = $inputPlan->id;
		if ($id>0) {
			$plan->load(array('id=?',$id));
		}
		$plan->copyFrom($inputPlan);
		
		$nr = $plan->nr;
		if ($nr <1)  {
			$gruppe_id = $plan->gruppe_id;
			$result = 
				$db->exec ( 'SELECT MAX(nr) AS max FROM plan WHERE gruppe_id=?', $gruppe_id );
			$newNr= 1 +$result[0][max];
			$plan->nr = $newNr;
		}
		
		$plan->save();
		$plan_obj = (object)[
			"planId" => $plan->id,
			"planNr" => $plan->nr];
		echo json_encode ($plan_obj);
	}

}


$f3 = require ('lib/base.php');
$f3->route ( 'GET /gruppen', 'Gruppe->loadAll' );
$f3->route ( 'GET /gruppe/@name', 'Gruppe->getFromName' );
$f3->route ( 'POST /gruppe', 'Gruppe->post' );
$f3->route ( 'DELETE /gruppe/@name', 'Gruppe->delete' );


$f3->route ( 'GET /suslist', 'Sus->loadAll' );
$f3->route ( 'GET /suslist/@gruppe_id', 'Sus->get' );
$f3->route ( 'POST /suslist', 'Sus->getlist' );
$f3->route ( 'POST /sus', 'Sus->post' );
$f3->route ( 'DELETE /sus/@id', 'Sus->delete' );

$f3->route ( 'GET /plaene/@gruppe_id', 'Plaene->loadAllForGroup' );
$f3->route ( 'GET /plan/@id', 'Plaene->get' );
$f3->route ( 'DELETE /plan/@id', 'Plaene->delete' );
$f3->route ( 'POST /plan', 'Plaene->post' );

$f3->run ();

?>
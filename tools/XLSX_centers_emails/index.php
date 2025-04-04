<?php
error_reporting(E_ERROR | E_PARSE);
chdir("../..");

function update_ini_file($data, $filepath)
{
    $content = "";

    $parsed_ini = parse_ini_file($filepath, true);

    //write it into file
    if ($parsed_ini) {
        if (!$handle = fopen($filepath, 'w')) {
            return false;
        }
    } else if (!$handle = fopen($filepath, 'a')) {
        return false;
    }

    foreach ($data as $section => $values) {
        $content .= "[" . $section . "]\n";
        foreach ($values as $key => $value) {
            $content .= $key . " = \"" . $value . "\"\n";
        }
        $content .= "\n";
    }


    $success = fwrite($handle, $content);
    fclose($handle);
    return $success;
}

if (isset($_POST['submit'])) {
    //mkdir("./partners/default/centers/" . 'test1');
    
    $data = json_decode($_POST['data'],true);
    $centersData = parse_ini_file("./partners/default/centers.cfg",true);

    foreach ($data as $key => $centers) {
      $center = $centers["Folder Name"];
      $string = trim($centers["FO email"])  . ", " . trim($centers["Ops Email"]);

      if(isset($centersData[$center])) $centersData[$center]["ce-notify"] = $string;
      else $centersData[$center] = [
        "name" => $center,
        "type" => "internal",
        "cluster" => "",
        "ce-notify" => $string
      ];
      echo $center . "</br>";
    }

    update_ini_file($centersData, "./partners/default/centers.cfg");
    echo "finish";
} 
?>
<!DOCTYPE html>
<html>

<head>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <style>
        #createForm {
            display: none;
        }
    </style>
</head>

<body onload="init()">
<p>Choose file  </p>
    <input id="fileInput" type="file" name="file" accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
    <pre id="fileContent"></pre>
    <form action="" method="post" id="createForm">
        <input type="hidden" name="data" id="data">
        <input type="submit" name="submit" value="create" id="submit" />
    </form>
</body>
<script>
    function init() {
        document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
    }

    async function handleFileSelect(e) {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */

        const workbook = XLSX.read(data);
       
        document.getElementById('data').value = toJson(workbook);
        document.getElementById("submit").click();
    }

    function toJson(workbook) {
        var json
        workbook.SheetNames.forEach(function(sheetName) {
            json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        });
        console.log(json)
        return JSON.stringify(json);
    }
</script>

</html>
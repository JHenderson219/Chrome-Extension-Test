//var tsv is the TSV file with headers
function tsvObj(tsv){
  var lines=tsv.split('\n');
 
  var result = [];
 
  var headers=lines[0].split('\t');
 
  for(var i=1;i<lines.length;i++){
 
	  var obj = {};
	  var currentline=lines[i].split('\t');
 
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
 
	  result.push(obj);
 
  }
  
  //return result; //JavaScript object
  return result; //JSON
}


var currentFile, currentObj, parsedJSON;
$("#printFile").on("click", function(){
  var selectedRow = document.getElementById("rowSelector").value;
  console.log(selectedRow);
  currentFile = document.getElementById("uploadedFile").files[0];
  console.log(currentFile);
  if (currentFile){
    var reader = new FileReader();
    reader.readAsText(currentFile, "UTF-8");
    reader.onload = function (evt){
      currentObj = tsvObj(evt.target.result);
      console.log(currentObj);
      const headers = Object.keys(currentObj[0]);
      console.log(headers);
      $("#printArea").empty()
      headers.map(function(e,i){
        $("#printArea").append("<br><p id='header"+i+"'>"+e+"</p>")
      });
      headers.map(function(e,i){
        $("#header"+i).append("<br><p id='column"+i+"'>"+currentObj[selectedRow][e]+"</p>")
      });
    }
  }
});

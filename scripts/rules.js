function rules() {
  if (document.getElementById("demo").innerHTML == "") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "./data/RULES.txt");
    xhttp.send();
    console.log("kuch");
  } else {
    document.getElementById("demo").innerHTML = "";
  }
}

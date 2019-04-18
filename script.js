var accessTkn = "";
function onSignIn(googleUser) {
  accessTkn = "";
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  accessTkn = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse().access_token;
  console.log(accessTkn);

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  genPdf();
}

  var student = "Chrome Support";
  var id = "220220";
  var date = "04/16/19";
  var time = "08:17 AM";
  var grade = "09";
  var reason = "In Repair";
  var chrometech = "AP";
  var device = "CZLOANERS_124";
  var serial = "HY3A91KD423560L";
var img;

function genPdf() {
  document.getElementById('export').onclick = exportPdf();
}
function exportPdf() {
  
  img = document.createElement("img");

  JsBarcode(img, serial, {
    text: " ",
    width: 5,
    height: 50,
    margin: 0
  });

  var first = student.split(" ")[0];
  var last = student.split(" ")[1];
  var doc = new jsPDF("p", "in", [324, 576]);
  doc.setLineWidth(0.01);
  doc.line(0, 0, 0, 8);
  doc.line(0, 8, 5.6, 8);
  doc.line(4.5, 0, 4.5, 8);
  doc.line(0, 0, 4.5, 0);
  doc.setFont("courier", "normal");
  doc.setFontSize("20");

  var centerText = function(text, y) {
    var textWidth =
      doc.getStringUnitWidth(text) *
      doc.internal.getFontSize() /
      doc.internal.scaleFactor;
    var textOffset = (4.5 - textWidth) / 2;
    doc.text(textOffset, y, text);
  };

  var rightText = function(text, y) {
    var textWidth =
      doc.getStringUnitWidth(text) *
      doc.internal.getFontSize() /
      doc.internal.scaleFactor;
    var textOffset = 4.5 - textWidth - 0.25;
    doc.text(textOffset, y, text);
  };

  var leftText = function(text, y) {
    var textWidth =
      doc.getStringUnitWidth(text) *
      doc.internal.getFontSize() /
      doc.internal.scaleFactor;
    var textOffset = 0.25;
    doc.text(textOffset, y, text);
  };

  centerText("ETHS ChromeZone", 0.5);
  leftText(date, 1);
  rightText(time, 1);
  leftText("First:", 2);
  rightText(first, 2);
  leftText("Last:", 2.5);
  rightText(last, 2.5);
  leftText("ID:", 3);
  rightText(id, 3);
  leftText("Grade:", 3.5);
  rightText(grade, 3.5);
  leftText("Reason:", 4);
  rightText(reason, 4);
  leftText("ChromeTech:", 4.5);
  rightText(chrometech, 4.5);
  centerText(device, 5.5);

  doc.addImage(img, 0.25, 6, 4, 1);
  var pdf = doc.output("dataurl", "receipt");
  printDoc(pdf);
}

function printDoc(pdf) {
  var formData = new FormData();
  formData.append('pdf', pdf, 'pdf.pdf');
  var req  = new XMLHttpRequest();
  var url = "https://cors-anywhere.herokuapp.com/https://www.google.com/cloudprint/submit?printerid=5ead4e7d-bf4d-6a12-73c7-2b2ee9f0fe1a&xsrf=AIp06Dh-Xmu7IEC2mUhJYroUgB2gUDTrHA:1555612559505&ticket='{\"version\": \"1.0\"}'&title=Receipt";
  req.onreadystatechange = function() {//Call a function when the state changes.
    if(req.readyState == 4 && req.status == 200) {
        alert(req.responseText);
    }
  };
  req.open('POST', url, true);
  req.setRequestHeader("Authorization","OAuth " + accessTkn);
  req.send(formData);
}

function setLightMode(bodyID,buttonID,deleteID) {
    var body = document.getElementById(bodyID);
    var button = document.getElementById(buttonID);
    var deleteButton = document.getElementById(deleteID);

    if (typeof(Storage) !== undefined) {
      if (localStorage.lightModeLCDC !== null && localStorage.lightModeLCDC !== undefined) {
        body.className = localStorage.lightModeLCDC ;}
      else {body.className = "light-mode" ;}

      if (localStorage.buttonLightModeLCDC !== null && localStorage.buttonLightModeLCDC !== undefined) {
        button.className = localStorage.buttonLightModeLCDC ;}
      else {button.className = "border";}

      if (deleteButton !== null) {
        if (localStorage.deleteLightModeLCDC !== null && localStorage.deleteLightModeLCDC !== undefined) {
          deleteButton.className = localStorage.deleteLightModeLCDC ;}
        else {deleteButton.className = "border-purple";}}
    }

    else {
      body.className = "light-mode" ;
      button.className = "border";
      deleteButton.className = "border-purple";}
}

function toggleDarkLight(bodyID,buttonID,deleteID) {
  var body = document.getElementById(bodyID);
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  if (typeof(Storage) !== undefined) {localStorage.setItem("lightModeLCDC", body.className);}

  var button = document.getElementById(buttonID);
  var currentClassButton = button.className;
  button.className = currentClassButton == "border" ? "border-dark" : "border";
  if (typeof(Storage) !== undefined) {localStorage.setItem("buttonLightModeLCDC", button.className);}
  
  var deleteButton = document.getElementById(deleteID);
  var currentClassDelete = deleteButton.className;
  deleteButton.className = currentClassDelete == "border-purple" ? "border-purple-dark" : "border-purple";
  if (typeof(Storage) !== undefined) {localStorage.setItem("deleteLightModeLCDC", deleteButton.className);}
}

function loadComments(data) {
  for (var i=0; i<data.length; i++) {
    var cuser = data[i].user.login;
    var cuserlink = "https://www.github.com/" + data[i].user.login;
    var clink = "https://github.com/quantumsideral/la-croisee-des-chemins/issues/{{ page.commentIssueId }}#issuecomment-" + data[i].url.substring(data[i].url.lastIndexOf("/")+1);
    var cbody = data[i].body_html;
    var cavatarlink = data[i].user.avatar_url;
    var cdate = Date.parse(data[i].created_at).toLocalDateString("yyyy-MM-dd HH:mm:ss");

    $("#comments").append("<div class='comment'><div class='commentheader'><div class='commentgravatar'>" + '<img src="' + cavatarlink + '" alt="" width="20" height="20">' + "</div><a class='commentuser' href=\""+ cuserlink + "\">" + cuser + "</a><a class='commentdate' href=\"" + clink + "\">" + cdate + "</a></div><div class='commentbody'>" + cbody + "</div></div>");}
}

function fireComments() {
  $.ajax({
    url: "https://api.github.com/repos/quantumsideral/la-croisee-des-chemins/issues/{{ page.commentIssueId }}/comments?per_page=100",
    headers: {Accept: "application/vnd.github.full+json"},
    dataType: "json",
    success: function (msg) {loadComments(msg);}});
}

function checkBrowser(idElement) {
  var element = document.getElementById(idElement);
  if (typeof(Storage) !== undefined) {
    element.innerHTML = "Votre navigateur aura la meilleure expérience sur le site.";}
  else {
    element.innerHTML = "Votre navigateur aura une expérience limitée. Essayez un navigateur plus récent !";}
}

function deleteSave(storyID) {
  var choices = storyID+"-choices"
  var temp = storyID+"-choicestemp"
  var progression = storyID+"-progression"
  if (typeof(Storage) !== undefined) {
    if (confirm("Attention, ceci est définitif ! Confirmer ?")) {
    localStorage.removeItem(choices);
    localStorage.removeItem(temp);
    localStorage.removeItem(progression);}}
}

function storeStory(localVar,elementID) {
  var vartemp = localVar+"temp"
  var text = document.getElementById(elementID).innerHTML.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
  var text = text.replace(/<button\b[^>]*>(.*?)<\/button>/i,"");
  var text = text.replace("<img src=\"https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png\" alt=\"\">","")
  if (typeof(Storage) !== undefined) {
    if (text !== localStorage.getItem(vartemp)) {
      localStorage.setItem(vartemp, text) ;
      if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
        localStorage.setItem(localVar, localStorage.getItem(localVar) + "<hr>" + text);}
      else {localStorage.setItem(localVar,text);}}}
}

function setProgression(localVar,item) {
  if (typeof(Storage) !== undefined) {localStorage.setItem(localVar,item);}
}

function checkProgression(element,localVar,url_item,url_site) {
  if (typeof(Storage) !== undefined) {
    var checkmark = document.getElementById(element);
    if (localStorage.getItem(localVar) == "last") {
      checkmark.innerHTML = " (Terminée ; <a href='"+url_site+"/"+url_item+"-votre-histoire.html#main-content'>Votre histoire</a>)";}
    else if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      checkmark.innerHTML = " (En cours)";}
    else if (localStorage.getItem(localVar) == null || localStorage.getItem(localVar) == undefined) {
      checkmark.innerHTML = " (Pas commencée)";}}
}

function createStory(localVar,elementID) {
  var element = document.getElementById(elementID);
  if(typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      element.innerHTML = localStorage.getItem(localVar)+"<hr><a href='http://creativecommons.org/licenses/by-nc-nd/4.0/'>\
        <img alt='Licence Creative Commons' style='border-width:0' src='https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png' /></a>";}
    else {element.innerHTML = "Résumé non disponible.";}}
  else {element.innerHTML = "Résumé non disponible.";}
}

function rollDice(faces,bonus,idElement,localVar){
  var element = document.getElementById(idElement);
  var die = bonus + Math.floor(Math.random() * faces) + 1;
  if (typeof(Storage) !== undefined) {localStorage.setItem(localVar, die);}
  element.innerHTML = die;
}

function addToBag(item,localVar){
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) == null || localStorage.getItem(localVar) == undefined) {
      localStorage.setItem(localVar,item);}
    else{localStorage.setItem(localVar,localStorage.getItem(localVar) + "," + item);}}
}

function removeFromBag(item,localVar){
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      var text = localStorage.getItem(localVar).replace(item,'').replace(',,',',');
      localStorage.setItem(localVar,text);}}
}

function removeAllFromFromBag(item,localVar){
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      var itemre = new RegExp(item,"g");
      var comare = new RegExp(",,","g");
      var text = localStorage.getItem(localVar).replace(itemre,'').replace(comare,',');
      localStorage.setItem(localVar,text);}}
}

function searchInBag(item,localVar){
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      return localStorage.getItem(localVar).includes(item);}
    else {return false}}}

function copyBag(formerVar,localVar) {
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) !== null && localStorage.getItem(localVar) !== undefined) {
      localStorage.setItem(localVar,localStorage.getItem(formerVar));}
    else {localStorage.setItem(localVar,"");}}
}

function createBag(localVar) {
  if (typeof(Storage) !== undefined) {
    if (localStorage.getItem(localVar) == null || localStorage.getItem(localVar) == undefined) {
      localStorage.setItem(localVar,"");}}
}

function deleteVars() {
  for (var i = 0, j = arguments.length; i < j; i++){
    if (typeof(Storage) !== undefined) {
      if (localStorage.getItem(arguments[i]) !== null && localStorage.getItem(arguments[i]) !== undefined) {
        localStorage.setItem(arguments[i],"");}}}
}

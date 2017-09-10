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

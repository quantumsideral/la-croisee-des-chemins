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

var fahrer = JSON.parse(localStorage.getItem('fahrer')) || [];

var tabelle = document.getElementById("fahrerTabelle");
var auswahlFahrer = document.getElementById("auswahlFahrer");

function zeigeFahrer() {
    tabelle.innerHTML = "<tr><th>Name</th><th>Alter</th><th>Automarke</th><th>Freie Plätze</th></tr>";
    auswahlFahrer.innerHTML = "<option value=''>-- Fahrer auswählen --</option>";

    for (var i = 0; i < fahrer.length; i++) {
        var fahrerInfo = fahrer[i];
        var row = tabelle.insertRow(-1);

        var nameCell = row.insertCell(0);
        nameCell.innerHTML = fahrerInfo.name;

        var alterCell = row.insertCell(1);
        alterCell.innerHTML = fahrerInfo.alter;

        var autoCell = row.insertCell(2);
        autoCell.innerHTML = fahrerInfo.auto;

        var platzCell = row.insertCell(3);
        platzCell.innerHTML = fahrerInfo.platz;

        var option = document.createElement("option");
        option.text = fahrerInfo.name;
        auswahlFahrer.add(option);
    }
}

function speichereFahrer() {
    var name = document.getElementById("name").value;
    var alter = document.getElementById("alter").value;
    var auto = document.getElementById("auto").value;
    var platz = document.getElementById("platz").value;

    var neuerFahrer = { name: name, alter: alter, auto: auto, platz: platz };
    fahrer.push(neuerFahrer);

    localStorage.setItem('fahrer', JSON.stringify(fahrer));
    zeigeFahrer();
}

function reduzierePlatz() {
    var selectedName = auswahlFahrer.value;
    var selectedDriverIndex = fahrer.findIndex(driver => driver.name === selectedName);

    if (selectedDriverIndex !== -1) {
        var selectedDriver = fahrer[selectedDriverIndex];

        if (selectedDriver.platz > 0) {
            selectedDriver.platz--;
            if (selectedDriver.platz === 0) {
                fahrer.splice(selectedDriverIndex, 1);
            alert("Du hast den letzten Platz geklaut :P!");
        
            }
            localStorage.setItem('fahrer', JSON.stringify(fahrer));
            zeigeFahrer();
        } 
    }
}

zeigeFahrer();
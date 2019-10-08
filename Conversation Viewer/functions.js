//Create global variables
var lastDate;
var dates = [];
var data;
var token;
var rowPosition = 1;
const rowsHistory = [
    ["User ID", "Message ID", "Direction", "Date", "Type", "Content"]
];
let csvHistory;
var firstRowHistory = rowsHistory[0].join(",");
var botId;
var zip = new JSZip();
var objJson = [];
var prevButton;
var nextButton;
var clickPageNumber = document.querySelectorAll('.clickPageNumber');
let current_page = 1;
let records_per_page = 15;

//Request 
function getInfo() {
    prevButton = document.getElementById('button_prev');
    nextButton = document.getElementById('button_next');
    document.getElementById("loader").style.display = "block";
    token = document.getElementById('token').value;
    var input = document.getElementById('token');
    input.value = "";
    stoppedTyping(input);
    axios.post('https://msging.net/commands', {
        id: "4a3d0851-6a7f-4e69-8a43-f8598145866e",
        method: "get",
        uri: "/threads?$take=100"
    }, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        data = response.data.resource.items; //Get only threads
        data = data.sort(function (a, b) { //Order by date
            return new Date(b.lastMessage.date) - new Date(a.lastMessage.date);
        });
        separateThreads(data); //Call a function to create the table
    })
        //Return a error if theres something wrong
        .catch(function (error) {
            if (error.response) {
                document.getElementById("loader").style.display = "none";
                alert("Invalid token");
            } else if (error.request) {
                console.log(error.request);
                document.getElementById("loader").style.display = "none";
                alert("Request problem!! :(");
            } else {
                console.log('Error', error.message);
                document.getElementById("loader").style.display = "none";
                alert("Request problem!! :(");
            }
        });

}

//Parses each thread separately and crosses information to receive contact data
function separateThreads(data) {
    for (var i = 0; i < data.length; i++) {
        lastDate = new Date(data[i].lastMessage.date);
        createDate(lastDate);
        getUserInfoToCreateTable(data[i].identity, i);
    }
    setTimeout(function () {
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
    }, 3000);

}

function addEventListeners() {
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);
}

function selectedPage() {
    let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber');
    for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
            page_number[i].style.opacity = "1.0";
        }
        else {
            page_number[i].style.opacity = "0.5";
        }
    }
}

function checkButtonOpacity() {
    current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
    current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
}

function changePage(page) {
    var tr, td;
    var tbody = document.getElementById("data");
    tbody.innerHTML = "";
    if (page < 1) {
        page = 1;
    }
    if (page > (numPages() - 1)) {
        page = numPages();
    }

    if (objJson.length > 0) {
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
            if (objJson[i]) {
                tr = tbody.insertRow(-1);
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = "<img src=" + objJson[i][0] + ">";

                td = tr.insertCell(tr.cells.length);
                td.innerHTML = "<strong>" + objJson[i][1] + "</strong>";

                td = tr.insertCell(tr.cells.length);
                td.innerHTML = objJson[i][2];

                td = tr.insertCell(tr.cells.length);
                td.innerHTML = objJson[i][3];

                td = tr.insertCell(tr.cells.length);
                td.innerHTML = objJson[i][4];

                /*  td = tr.insertCell(tr.cells.length);
                 td.innerHTML = "<button class='bp-btn bp-btn--bot bp-btn--small' id=" + data[i].identity + " onClick='openHistory(this)'>See more</button>"; */

                td = tr.insertCell(tr.cells.length);
                td.innerHTML = "<label class='bp-input--check--wrapper mb4'>" +
                    "<input class='bp-input' type='checkbox' onchange='enableExport()' id=row-" + tr.rowIndex + " name='checkbox-group' value=" + objJson[i][3] + ">" +
                    "<div class='bp-input--checkbox'>&check;</div>" +
                    "</label>";
            }
        }
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("page-content").style.display = "block";
    document.getElementById('bp-table').style.display = "table";
    document.getElementById('b-exportar').style.display = "initial";
    document.getElementById('b-exportar').disabled = true;
    document.getElementsByClassName('form-date')[0].style.display = "block";
    checkButtonOpacity();
    selectedPage();
}

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function clickPage() {
    document.addEventListener('click', function (e) {
        if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
            current_page = e.target.textContent;
            changePage(current_page);
        }
    });
}

function pageNumbers() {
    let pageNumber = document.getElementById('page_number');
    pageNumber.innerHTML = "";

    for (let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
    }
}

function numPages() {
    return Math.ceil(objJson.length / records_per_page);
}


//Call the Contacts extension to get contact data and create table
function getUserInfoToCreateTable(user, i) {
    axios.post('https://msging.net/commands', {
        id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
        method: "get",
        uri: "/contacts/" + user
    }, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.data.status == "failure") {
        } else {
            let user = response.data.resource;
            createObj(user, i);
        }
    });

}
//}


function createObj(user, i) {
    if (user) {
        objJson[i] = [];
        if (user.photoUri) {
            objJson[i].push(user.photoUri);
        } else {
            objJson[i].push("https://portal.blip.ai/fonts/UserNone.svg?7d8dc449af6584f485785babbad366d0");
        }

        if (typeof (user.name) != "undefined") {
            objJson[i].push(user.name);
        }
        if (user.source == "0mn.io") {
            objJson[i].push("BLiP Chat");
        } else {
            objJson[i].push(user.source);
        }
        objJson[i].push(user.identity);

        objJson[i].push(dates[i]);

        objJson[i].push(data[i].identity);
    }
}

//Create the table, remove the "loading" e shows components
function createTable(user, i) {
    var tr, td;
    var tbody = document.getElementById("data");
    tr = tbody.insertRow(-1);
    td = tr.insertCell(tr.cells.length);
    if (user) {
        if (user.photoUri) {
            td.innerHTML = "<img src=" + user.photoUri + ">";
        } else {
            td.innerHTML = "<img src='https://portal.blip.ai/fonts/UserNone.svg?7d8dc449af6584f485785babbad366d0'></img>";
        }

        td = tr.insertCell(tr.cells.length);
        if (typeof (user.name) != "undefined") {
            td.innerHTML = "<strong>" + user.name + "</strong>";
        }
        if (user.source == "0mn.io") {
            td = tr.insertCell(tr.cells.length);
            td.innerHTML = "BLiP Chat";
        } else {
            td = tr.insertCell(tr.cells.length);
            td.innerHTML = user.source;
        }
        td = tr.insertCell(tr.cells.length);
        td.innerHTML = user.identity;

        td = tr.insertCell(tr.cells.length);
        td.innerHTML = dates[i];

        /*  td = tr.insertCell(tr.cells.length);
         td.innerHTML = "<button class='bp-btn bp-btn--bot bp-btn--small' id=" + data[i].identity + " onClick='openHistory(this)'>See more</button>"; */

        td = tr.insertCell(tr.cells.length);
        td.innerHTML = "<label class='bp-input--check--wrapper mb4'>" +
            "<input class='bp-input' type='checkbox' onchange='enableExport()' id=row-" + tr.rowIndex + " name='checkbox-group' value=" + user.identity + ">" +
            "<div class='bp-input--checkbox'>&check;</div>" +
            "</label>";

    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("page-content").style.display = "block";
    document.getElementById('bp-table').style.display = "table";
    document.getElementById('b-exportar').style.display = "initial";
    document.getElementById('b-exportar').disabled = true;
    document.getElementsByClassName('form-date')[0].style.display = "block";
}


//Open the chat history using the BLiP Components (VUE.js)
function openHistory(item) {
    //TODO 
}



//Select all the checkboxes when checking the main
function toggle(source) {
    checkboxes = document.getElementsByName('checkbox-group');
    table = document.getElementById("bp-table");
    rows = table.getElementsByTagName("tr");
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (rows[i + 1].style.display != "none") {
            checkboxes[i].checked = source.checked;
        }
    }
    enableExport();
}

//Date format
function createDate(lastDate) {
    var dd = lastDate.getDate();
    var mm = lastDate.getMonth() + 1; //January is 0!

    var yyyy = lastDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var formatedDate = mm + '/' + dd + '/' + yyyy;
    dates.push(formatedDate);
    return dates;
}

//Enable or disable the preview button whether or not there is a token in the input
function stoppedTyping(input) {
    if (input.value.length > 0) {
        document.getElementById('b-visualizar').disabled = false;
    } else {
        document.getElementById('b-visualizar').disabled = true;
    }
}

//Enable or disable the export button if there is a checkbox checked
function enableExport() {
    var checkboxes = document.getElementsByName('checkbox-group');
    var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    if (checkedOne) {
        document.getElementById('b-exportar').disabled = false;
    } else {
        document.getElementById('b-exportar').disabled = true;
        document.getElementsByName('checkbox-all')[0].checked = false;
    }
}

//Create the .csv files and put them into the .zip file
function exportCsv() {
    var checked = getElementsSelecteds();
    const rowsThreads = [
        ["User Id", "Channel"]
    ];

    var promises = [];

    checked.forEach(function (userId, index) {
        //threads file
        rowsThreads[index + 1] = [];
        rowsThreads[index + 1].push(userId); //id do usuario
        rowsThreads[index + 1].push(getUserSource(userId)); //canal do usuario

        promises.push(getUserMessages(userId));
    });

    Promise.all(promises)
        .then(function (allValues) {

            allValues.forEach(function (value) {
                //messages froma user
                var message = value.messages;
                var userId = value.userId;
                //fill the array and create the history file
                message.forEach(function (msg) {
                    rowsHistory[rowPosition] = [];
                    rowsHistory[rowPosition].push(userId);
                    rowsHistory[rowPosition].push(msg.id);
                    rowsHistory[rowPosition].push(msg.direction);
                    rowsHistory[rowPosition].push(msg.date);
                    rowsHistory[rowPosition].push(msg.type);
                    if (msg.type.includes("application")) {
                        rowsHistory[rowPosition].push(JSON.stringify(msg.content));
                    } else {
                        rowsHistory[rowPosition].push(msg.content);
                    }
                    var rowHistory = rowsHistory[rowPosition].join(",");
                    csvHistory += rowHistory + "\r\n";
                    rowPosition++;
                });
            });

            zip.file("chat-history-" + botId + ".csv", csvHistory);


            //download file
            zip.generateAsync({ type: "base64" }).then(function (base64) {
                window.location = "data:application/zip;base64," + base64;
            });


        });

    let csvThreads;
    rowsThreads.forEach(function (rowArray) {
        var rowThread = rowArray.join(",");
        csvThreads += rowThread + "\r\n";
    });


    var encodedUriThreads = encodeURI(csvThreads);
    var linkThreads = document.createElement("a");
    linkThreads.setAttribute("href", encodedUriThreads);
    linkThreads.setAttribute("download", "threads-" + data[0].ownerIdentity + ".csv");
    botId = data[0].ownerIdentity;

    document.body.appendChild(linkThreads);
    zip.file("threads-" + data[0].ownerIdentity + ".csv", csvThreads); //adiciona o arquivo threads ao .zip


}

//Get the rows wich there are checkboxes checked
function getElementsSelecteds() {
    var checkedValue = [];
    var checkedElements = document.getElementsByName('checkbox-group');
    for (var i = 0; checkedElements[i]; ++i) {
        if (checkedElements[i].checked) {
            checkedValue[i] = checkedElements[i].value;
        }
    }
    return checkedValue;
}

function getUserSource(userId) {
    var source = userId.split("@");
    var channel = source[1].split(".");
    var userChannel = channel[0].charAt(0).toUpperCase() +
        channel[0].slice(1);
    if (userChannel == "0mn") {
        return "BLiP Chat";
    } else {
        return userChannel;
    }
}

//filter by date
function filter() {
    var initialDate, finalDate, table, tr, td, i, txtValue;
    initialDate = document.getElementById("initial").value;
    finalDate = document.getElementById("final").value;
    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);
    initialDate.setDate(initialDate.getDate() + 1);
    finalDate.setDate(finalDate.getDate() + 1);
    finalDate.setHours(23);
    finalDate.setMinutes(59);
    finalDate.setSeconds(59);
    table = document.getElementById("bp-table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            txtValue = new Date(txtValue);
            txtValue.setHours(23);
            txtValue.setMinutes(59);
            txtValue.setSeconds(59);
            if ((txtValue >= initialDate) && (txtValue <= finalDate)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
                document.getElementById("row-" + i).checked = false;
            }
        }
    }
}

//get users messages
function getUserMessages(userId) {
    return new Promise(
        function (resolve, reject) {
            axios.post('https://msging.net/commands', {
                id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
                method: "get",
                uri: "/threads/" + userId
            }, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return resolve({
                    userId: userId,
                    messages: response.data.resource.items
                });
            }).catch(function (err) {
                return reject(err);
            });
        }
    );
}


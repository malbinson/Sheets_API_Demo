//gapi.load('client:auth2',read);
//gapi.load('client:auth2',update);

//gapi.load('client');

read();

function read() {
    console.log("READ")
    var range = 'A1:C6';
    $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1_jwvqIuHLL79VMd7a5qoxinWpJLNsQRzX8PYHjOR_7A/values/Sheet1!' + range + '?key=AIzaSyAFtlrU913l8DZ8cBgzgxlo4G4RhCG_6xY',
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            process(result,range);
            //return result;
        },
        error: function () {
            alert('Failed!');
        }
    });

    var f = {
        values: [
            ["Item", "Cost", "Stocked", "Ship Date"],
            ["Reily", "$20.50", "4", "3/1/2016"],
            ["Door", "$15", "2", "3/15/2016"],
            ["Engine", "$100", "1", "30/20/2016"],
            ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
        ]
    };

    $.ajax({
        headers: {  "Content-type": "application/json",
                    "Content-Length": f.length,
                    "Authorization": "Bearer ya29.GltTBD9wMTZD08Vaaxig_f32N_3tOmwxPwUDvWzUNLuQgDJyFKNK1MlPmWam-dfzWea3DMFCHtK3--BsZztvPOM58wNMDV9nBqz9w21Ngfi3PloLyZ7g0Pyo-yVw"},
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1_jwvqIuHLL79VMd7a5qoxinWpJLNsQRzX8PYHjOR_7A/values/Sheet1!A1?key=AIzaSyAFtlrU913l8DZ8cBgzgxlo4G4RhCG_6xY',
        type: 'PUT',
        crossDomain: true,
        data: JSON.stringify(f),
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
        },
        error: function () {
            alert('Failed!');
        }
    });



}

function process(result,range){
    data = [];
    for(var x=0;x<result.values.length;x++) {
        data[x] = [];
        for(var y=0;y<result.values[x].length;y++) {
            data[x][y] = result.values[x][y];
        }
    }

    console.log(data);

    //update(w);

}

w = [
    ["Gwen", "Cost", "Stocked", "Ship Date"],
    ["Wheel", "$20.50", "4", "3/1/2016"],
    ["Door", "$15", "2", "3/15/2016"],
    ["Engine", "$100", "1", "30/20/2016"],
    ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
];

function update() {
    console.log("UPDATE");
    var data = {"values": w};

    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': 'AIzaSyAFtlrU913l8DZ8cBgzgxlo4G4RhCG_6xY',
        // clientId and scope are optional if auth is not required.
        'clientId': '164309800683-chd6hbvu30juda91k06o1b27bnlg5656.apps.googleusercontent.com',
        'scope': 'profile',
    }).then(function() {
        // 3. Initialize and make the API request.
        return gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/1_jwvqIuHLL79VMd7a5qoxinWpJLNsQRzX8PYHjOR_7A/values/Sheet1!A2?valueInputOption=USER_ENTERED',
            'method': 'PUT',
            'body': data
        })
    }).then(function(response) {
        console.log(response.result);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

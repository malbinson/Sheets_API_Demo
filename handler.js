gapi.load('auth2');




function read(range) {
    console.log(range);
//    var range = 'A1:C6';
    return $.ajax({
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
    //return true;
}

function process(result,range){
    console.log(result);
    console.log(result.values[0])
    data = [];
    for(var x=0;x<result.values.length;x++) {
        data[x] = [];
        for(var y=0;y<result.values[x].length;y++) {
            data[x][y] = result.values[x][y];
        }
    }

    console.log(data);



}

w = [
    ["Gwen", "Cost", "Stocked", "Ship Date"],
    ["Wheel", "$20.50", "4", "3/1/2016"],
    ["Door", "$15", "2", "3/15/2016"],
    ["Engine", "$100", "1", "30/20/2016"],
    ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
];



//write(w)

//update(w);

function update(range) {
    console.log("update");
    var data = {"values": range};

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
// 1. Load the JavaScript client library.


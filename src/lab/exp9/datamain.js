var dataMemory = [];
if (!sessionStorage.getItem("datamem")) {
    sessionStorage.setItem("datamem", dataMemory);
    dataMemory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log("not set");
} else {
    var temp = JSON.parse(sessionStorage.getItem('datamem'));
    for (var i = 0; i < 64; i++) {
        if (temp[i] != ',')
            dataMemory[i] = temp[i];
    }
    console.log(temp)
    console.log(dataMemory);
    var index = 0;
    $('#datamemory').find('td').each(function() {
        $(this).find("input").val(dataMemory[index]);
        index++;
    });
    console.log(index);
}

function setData() {
    console.log("update");
    var index = 0;
    $('#datamemory').find('td').each(function() {
        dataMemory[index++] = $(this).find("input").val();
    });
    console.log(dataMemory);
    sessionStorage.datamem = JSON.stringify(dataMemory);
    console.log(sessionStorage.getItem("datamem"));
}

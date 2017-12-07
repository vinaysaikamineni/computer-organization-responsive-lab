/*
	Name : Floating Point Numbers Representation Simulator
	Author : Giritheja
	Description : This file converts the given input into three
	normalized representations :
	1.No-Zero Noramlization
	2.Abrupt underflow Normalization
	3.Denormalization
	It determines whether the given output is rounded or accurate in
	the above three formats.
*/
//dictionary for the denoramlized numbers the numbers are multiplied by 1000.
var denormalized = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500];
//dictionary for the denoramlized numbers the numbers are multiplied by 1000.
var normalized = [500, 625, 750, 875, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500];
//dictionary for positions of different number to place the pointing arrow on the canvas.
var scalednorm = [62, 70, 78, 86, 94, 107, 124, 144, 160, 187, 223, 258];
//dictionary for positions of different number to place the pointing arrow on the canvas.
var scaleddenorm = [48, 58, 75, 89, 104, 117, 134, 154, 170, 197, 233, 268];
var accuracy = document.getElementById('accuracytable');
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");
var img = new Image(); // Create new img element
img.src = 'images/normalized.png'; // Set source path
ctx.drawImage(img, 0, 0);
ctx.beginPath(); //40px at zero
//ctx.moveTo(104,380); //258 at 3.5
//ctx.lineTo(104,340);	//260 220 140 100
//ctx.stroke();
//function to clear all values set input values to null.
function clearall() {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath(); //40px at zero
    accuracy.rows[0].cells[1].innerHTML = null;
    accuracy.rows[0].cells[1].style.color = 'transparent';
    accuracy.rows[1].cells[1].innerHTML = null;
    accuracy.rows[1].cells[1].style.color = 'transparent';
    accuracy.rows[2].cells[1].innerHTML = null;
    accuracy.rows[2].cells[1].style.color = 'transparent';
    $('#resulttable tr').each(function() {
        $(this).find("td:nth-child(5)").context.cells[4].style.backgroundColor = 'transparent';
        $(this).find("td:nth-child(3)").context.cells[2].style.backgroundColor = 'transparent';
        $(this).find("td:nth-child(2)").context.cells[1].style.backgroundColor = 'transparent';
        $(this).find("td:nth-child(1)").context.cells[0].style.backgroundColor = 'transparent';
        $(this).find("td:nth-child(4)").context.cells[3].style.backgroundColor = 'transparent';


    })
}
//function to draw arrows the on the no-zero normalized number line
//and abrupt underflow numberline.
function drawarrownorm(index) {
    var xcord = scalednorm[index];
    ctx.moveTo(xcord, 140);
    ctx.lineTo(xcord, 100);
    ctx.stroke();
    ctx.moveTo(xcord - 10, 110);
    ctx.lineTo(xcord, 100);
    ctx.stroke();
    ctx.moveTo(xcord + 10, 110);
    ctx.lineTo(xcord, 100);
    ctx.stroke();
    if (index > 3) {
        ctx.moveTo(xcord + 10, 260);
        ctx.lineTo(xcord + 10, 220);
        ctx.stroke();
        ctx.moveTo(xcord - 10 + 10, 230);
        ctx.lineTo(xcord + 10, 220);
        ctx.stroke();
        ctx.moveTo(xcord + 10 + 10, 230);
        ctx.lineTo(xcord + 10, 220);
        ctx.stroke();
    } else {
        ctx.moveTo(40 + 10, 260);
        ctx.lineTo(40 + 10, 220);
        ctx.stroke();
        ctx.moveTo(40, 230);
        ctx.lineTo(40 + 10, 220);
        ctx.stroke();
        ctx.moveTo(60, 230);
        ctx.lineTo(40 + 10, 220);
        ctx.stroke();
    }
}
//function to draw arrows the on the denormalized number line
function drawarrowdenorm(index) {
    var xcord = scaleddenorm[index];
    ctx.moveTo(xcord, 380);
    ctx.lineTo(xcord, 340);
    ctx.stroke();
    ctx.moveTo(xcord - 10, 350);
    ctx.lineTo(xcord, 340);
    ctx.stroke();
    ctx.moveTo(xcord + 10, 350);
    ctx.lineTo(xcord, 340);
    ctx.stroke();
}
//function to calculate the index in normalized and denormalized dictionaries
//by comparing which is the number to closest to and then calling drawarrow functions
//to draw arrows on the numberline.

function convertfloat() {
    clearall();
    var numberstr = document.getElementById('decimal').value;
    var number = parseInt(parseFloat(numberstr.substring(0, 5)) * 1000);
    if (number < 0) {
        number = -number;
    }
    //To check if the input is valid.
    if (number > 3875 || isNaN(number)) {
        return;
    }
    console.log(number);
    var leastdiffdenorm;
    var indexdenorm = 0;
    var indexnorm = 0;
    var leastdiffnorm;
    var trignorm = 0;
    var trigdenorm = 0;
    for (var i = 0; i < normalized.length; i++) {
        if (number >= normalized[i]) {
            if (trignorm) {
                if (leastdiffnorm > (number - normalized[i])) {
                    leastdiffnorm = number - normalized[i];
                    indexnorm = i;
                }
            } else {
                leastdiffnorm = number - normalized[i];
                indexnorm = i;
                trignorm++;

            }
        }
        if (number >= denormalized[i]) {
            if (trigdenorm) {
                if (leastdiffdenorm > (number - denormalized[i])) {
                    leastdiffdenorm = number - denormalized[i];
                    indexdenorm = i;
                }
            } else {
                leastdiffdenorm = number - denormalized[i];
                indexdenorm = i;
                trigdenorm++;

            }
        }
    }
    if (parseFloat(numberstr.substring(0, 5)) * 1000 == normalized[indexnorm]) {
        if (indexnorm > 3) {
            accuracy.rows[1].cells[1].innerHTML = 'ACCURATE';
            accuracy.rows[1].cells[1].style.color = 'green';
        } else {
            accuracy.rows[1].cells[1].innerHTML = 'ROUNDED';
            accuracy.rows[1].cells[1].style.color = 'red';
        }
        accuracy.rows[0].cells[1].innerHTML = 'ACCURATE';
        accuracy.rows[0].cells[1].style.color = 'green';

    } else {
        accuracy.rows[0].cells[1].innerHTML = 'ROUNDED';
        accuracy.rows[0].cells[1].style.color = 'red';
        accuracy.rows[1].cells[1].innerHTML = 'ROUNDED';
        accuracy.rows[1].cells[1].style.color = 'red';
    }
    if (parseFloat(numberstr.substring(0, 5)) * 1000 == denormalized[indexdenorm]) {
        accuracy.rows[2].cells[1].innerHTML = 'ACCURATE';
        accuracy.rows[2].cells[1].style.color = 'green';
    } else {
        accuracy.rows[2].cells[1].innerHTML = 'ROUNDED';
        accuracy.rows[2].cells[1].style.color = 'red';
    }
    drawarrownorm(indexnorm);
    drawarrowdenorm(indexdenorm);
    $('#resulttable tr').each(function() {
        if (parseFloat($(this).find("td:nth-child(5)").html()) * 1000 == denormalized[indexdenorm]) {
            $(this).find("td:nth-child(5)").context.cells[4].style.backgroundColor = 'rgb(114, 114, 207)';
        }

        if (parseFloat($(this).find("td:nth-child(3)").html()) * 1000 == normalized[indexnorm]) {
            $(this).find("td:nth-child(3)").context.cells[2].style.backgroundColor = 'rgb(183, 56, 56)';
            $(this).find("td:nth-child(2)").context.cells[1].style.backgroundColor = 'rgb(183, 56, 56)';
            $(this).find("td:nth-child(1)").context.cells[0].style.backgroundColor = 'rgb(183, 56, 56)';
            $(this).find("td:nth-child(4)").context.cells[3].style.backgroundColor = 'rgb(183, 56, 56)';

        }
    })

}

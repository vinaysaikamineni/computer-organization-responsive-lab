var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var img = document.getElementById('cpu');
var rownumber = 1;
var imgnumber = 2;
var image = document.getElementById('process');
var video = document.getElementById('video');
var opcode;
var Rs = 0;
var Rt = 0;
var Rd = 0;
var Rstrig = 0;
var Rttrig = 0;
var Rdtrig = 0;
var funct;
var instr;
var text;
var sum;
var imm = 2080;
var instructionCounter = 0;
var instructionType;
var instructions = ['Write Instructions<br/> Press Load button.', 'Instructions Loaded<br/> Click Execute button.', 'Program Counter Updated <br/>Click Next button.', 'Instruction Fetched <br/>Click Next button.', null, 'Control Signals Generated.', null, null, null, null];
var instruction = document.getElementById('instructions');
instruction.innerHTML = instructions[instructionCounter];

function updatereg() {
    var index = 0;
    $('#regmemory').find('td').each(function() {
        r[index++] = $(this).find("input").val();
        console.log($(this).find("input").val());
    });

}

function change() {
    if (imgnumber == 10) {
        imgnumber = 1;
        instructionCounter = 0;
    }
    instructionCounter++;
    //img.src="frames/cpu"+imgnumber+".jpg";
    image.src = "frames/frame" + imgnumber + ".mp4";
    if (instructions[instructionCounter]) {
        instruction.innerHTML = instructions[instructionCounter];
    } else {
        if (instructionCounter == 4) {
            text = 'Instruction decoded.' + instr + '-Type Instruction <br/> Rs = ' + parseInt(Rs, 2);
            if (instructionType == 'J') {
                text = text + '<br/> Rd = ' + 0;
                text = text + '<br/>Rt = ' + 0;
            } else {
                text = text + '<br/> Rd = ' + parseInt(Rd, 2);
                text = text + '<br/>Rt = ' + parseInt(Rt, 2);
            }
            text = text + '<br/> Imm = ' + imm //Need to change this depending on the input.
            instruction.innerHTML = text;
        }
    }
    if (instructionCounter == 6) {
        text = 'Instruction Execute.<br/>';
        if (instructionType == 'J') {
            text = text + '<br/>BusA = ' + 0;
            text = text + '<br/>BusB = ' + 0;
        } else {
            text = text + '<br/>BusA = ' + r[parseInt(Rs, 2)];
            text = text + '<br/>BusB = ' + r[parseInt(Rt, 2)];
        }
        if (instructionType == 'R')
            text = text + '<br/>Rw =' + parseInt(Rd, 2);
        if (instructionType == 'I')
            text = text + '<br/>Rw =' + parseInt(Rt, 2);
        if (instructionType == 'J')
            text = text + '<br/>Rw =' + 0;
        text = text + '<br/>Extender = ' + imm; //Need to change this.
        instruction.innerHTML = text;
    }
    if (instructionCounter == 7) {
        text = 'ALU  Operation.<br/>';
        if (instructionType == 'J') {
            text = text + '<br/>Operation = ' + 'add';
            text = text + '<br/>ALUin1 = ' + '0';
        } else {
            text = text + '<br/>Operation = ' + instr;
            text = text + '<br/>ALUin1 = ' + r[parseInt(Rs, 2)];
        }
        if (instructionType == 'R')
            text = text + '<br/>ALUin2 = ' + r[parseInt(Rt, 2)];
        if (instructionType == 'I')
            text = text + '<br/>ALUin2 = ' + imm;
        if (instructionType == 'J')
            text = text + '<br/>ALUin2 = ' + '0';
        instruction.innerHTML = text;
    }
    if (instructionCounter == 8) {
        text = 'Memory Read.<br/>';
        text = text + '<br/>ALUout = ' + sum;
        text = text + '<br/>Zero Flag = ' + (sum ? 0 : 1);
        text = text + '<br/>Address = ' + sum;
        instruction.innerHTML = text;
    }
    if (instructionCounter == 9) {
        text = 'Memory Write.<br/>';
        if (instructionType == 'R')
            text = text + '<br/>DataIn = ' + r[parseInt(Rt, 2)];
        if (instructionType == 'I')
            text = text + '<br/>DataIn = ' + r[parseInt(Rs, 2)];
        if (instructionType == 'J') {
            text = text + '<br/>DataIn = ' + 0;
            text = text + '<br/>Mem Address = ' + 0;
            text = text + '<br/>BusW = ' + 0;
        } else {
            text = text + '<br/>Mem Address = ' + sum;
            text = text + '<br/>BusW = ' + sum;
        }
        if (instructionType == 'R')
            text = text + '<br/>Rw =' + parseInt(Rd, 2);
        if (instructionType == 'I')
            text = text + '<br/>Rw =' + parseInt(Rt, 2);
        if (instructionType == 'I')
            text = text + '<br/>Rw =' + 0;
        instruction.innerHTML = text;
        if (instructionType == 'R') {
            r[parseInt(Rd, 2)] = sum;
            var index = 0;
            $('#regmemory').find('td').each(function() {
                if (instructionType == 'R') {
                    if (index == parseInt(Rd, 2))
                        $(this).find("input").val(sum);
                }
            })
        }
        if (instructionType == 'I') {
            if (instr != 'beq') {
                if (instr != 'store') {
                    if (index == parseInt(Rt, 2))
                        $(this).find("input").val(sum);
                } else {
                    if (index == sum)
                        $(this).find("input").val(r[parseInt(Rt, 2)]);
                }
            }
        }
        index++;
    };


    video.load();
    video.play();
    imgnumber++;
}

function update() {
    if (instructionType == 'R') {
        var result = document.getElementById('resultr');
        console.log(result);
        result.style.display = "block";
        result.rows[1].cells[1].innerHTML = Rs;
        result.rows[1].cells[2].innerHTML = Rt;
        result.rows[1].cells[3].innerHTML = Rd;
        if (instr == "add") {
            result.rows[1].cells[5].innerHTML = "10000";
            sum = parseInt(r[parseInt(Rs, 2)]) + parseInt(r[parseInt(Rt, 2)]);
        }
        if (instr == "and" || instr == "or") {
            result.rows[1].cells[5].innerHTML = "10010";
            if (instr == "and") {
                sum = parseInt(r[parseInt(Rs, 2)]) & parseInt(r[parseInt(Rt, 2)]);
            }
            if (instr == "or") {
                sum = parseInt(r[parseInt(Rs, 2)]) | parseInt(r[parseInt(Rt, 2)]);

            }
        }
        if (instr == "sub") {
            result.rows[1].cells[5].innerHTML = "10001";
            sum = parseInt(r[parseInt(Rs, 2)]) - parseInt(r[parseInt(Rt, 2)]);
        }
        document.getElementById('aluctr').innerHTML = instr;
        document.getElementById('RegDst').innerHTML = '1';
        document.getElementById('RegWr').innerHTML = '1';
        document.getElementById('ExtOp').innerHTML = '0';
        document.getElementById('ALUSrc').innerHTML = '0';
        document.getElementById('jump').innerHTML = '0';
    }

    if (instructionType == 'I') {
        document.getElementById('aluctr').innerHTML = instr;
        document.getElementById('RegDst').innerHTML = '0';
        document.getElementById('RegWr').innerHTML = '1';
        document.getElementById('ExtOp').innerHTML = '1';
        document.getElementById('ALUSrc').innerHTML = '1';
        document.getElementById('jump').innerHTML = '0';
        Rd = 0;
        var result = document.getElementById('resulti');
        console.log(result);
        result.style.display = "block";
        result.rows[1].cells[1].innerHTML = Rs;
        result.rows[1].cells[2].innerHTML = Rt;
        var immbin = imm.toString(2);
        if (instr == "add") {
            //result.rows[1].cells[5].innerHTML="10000";
            sum = parseInt(r[parseInt(Rs, 2)]) + parseInt(imm);
        }
        if (instr == "and" || instr == "or") {
            //result.rows[1].cells[5].innerHTML="10010";
            if (instr == "and") {
                sum = parseInt(r[parseInt(Rs, 2)]) & parseInt(imm);
            }
            if (instr == "or") {
                sum = parseInt(r[parseInt(Rs, 2)]) | parseInt(imm);

            }
        }
        if (instr == "sub") {
            //result.rows[1].cells[5].innerHTML="10001";
            sum = parseInt(r[parseInt(Rs, 2)]) - parseInt(imm);
        }
        if (instr == 'load') {
            sum = r[parseInt(r[parseInt(Rs, 2)]) + parseInt(imm)];
        }
        if (instr == 'store') {
            sum = parseInt(r[parseInt(Rt, 2)]);
        }
        if (instr == 'beq') {
            if (parseInt(r[parseInt(Rt, 2)]) == parseInt(r[parseInt(Rs, 2)])) {
                sum = parseInt(r[parseInt(Rs, 2)]) - parseInt(imm);
            } else {
                sum = 0;
            }
        }
        for (var i = immbin.length; i < 15; i++) {
            immbin = "0" + immbin;
        }
        result.rows[1].cells[3].innerHTML = immbin;
    }
    if (instructionType == 'J') {
        document.getElementById('aluctr').innerHTML = 'add';
        document.getElementById('RegDst').innerHTML = '0';
        document.getElementById('RegWr').innerHTML = '0';
        document.getElementById('ExtOp').innerHTML = '0';
        document.getElementById('ALUSrc').innerHTML = '0';
        document.getElementById('jump').innerHTML = '1';
        sum = 0;
        var result = document.getElementById('resultj');
        result.style.display = "block";
        var immbin = imm.toString(2);
        for (var i = immbin.length; i < 25; i++) {
            immbin = "0" + immbin;
        }
        result.rows[1].cells[1].innerHTML = immbin;
    }
}

function load() {
    var rowname = 'row' + rownumber;
    var inputs = document.getElementById(rowname).value;
    inputs = inputs.split(/[\s,]+/);
    console.log(inputs);
    instructionCounter++;
    instruction.innerHTML = instructions[instructionCounter];
    for (index in inputs) {
        if (inputs[index] == "and") {
            instr = "and";
            instructionType = 'R';
        }
        if (inputs[index] == "or") {
            instr = "or";
            instructionType = 'R';
        }
        if (inputs[index] == "add") {
            instr = "add";
            instructionType = 'R';
        }
        if (inputs[index] == "sub") {
            instr = "sub";
            instructionType = 'R';
        }
        if (inputs[index] == "andi") {
            instr = "and";
            instructionType = 'I';
        }
        if (inputs[index] == "ori") {
            instr = "or";
            instructionType = 'I';
        }
        if (inputs[index] == "addi") {
            instr = "add";
            instructionType = 'I';
        }
        if (inputs[index] == "subi") {
            instr = "sub";
            instructionType = 'I';
        }
        if (inputs[index] == "load") {
            instr = "load";
            instructionType = 'I';
        }
        if (inputs[index] == "store") {
            instr = "store";
            instructionType = 'I';
        }
        if (input[index] == 'beq') {
            instr = 'beq';
            instructionType = 'I';
        }
        if (inputs[index] == 'j') {
            instr = 'j';
            instructionType = 'J';
        }
        if (instructionType == 'R') {
            if (inputs[index][0] == 'r') {
                var number = parseInt(inputs[index].substr(1, inputs[index].length));
                if (!Rdtrig) {
                    Rd = number.toString(2);
                    Rdtrig++;
                    for (var i = Rd.length; i < 5; i++) {
                        Rd = '0' + Rd;
                    }
                } else {
                    if (!Rstrig) {
                        Rs = number.toString(2);
                        for (var i = Rs.length; i < 5; i++) {
                            Rs = '0' + Rs;
                        }
                        Rstrig++;
                        console.log(Rs);
                    } else if (!Rttrig) {
                        Rt = number.toString(2);
                        for (var i = Rt.length; i < 5; i++) {
                            Rt = '0' + Rt;
                        }
                        Rttrig++;
                        console.log(Rt);
                    }
                }
            }

        }
        if (instructionType == 'I') {
            if (inputs[index][0] == 'r') {
                var number = parseInt(inputs[index].substr(1, inputs[index].length));
                if (!Rttrig) {
                    Rt = number.toString(2);
                    for (var i = Rt.length; i < 5; i++) {
                        Rt = '0' + Rt;
                    }
                    Rttrig++;
                    console.log(Rt);
                } else {
                    if (!Rstrig) {
                        Rs = number.toString(2);
                        for (var i = Rs.length; i < 5; i++) {
                            Rs = '0' + Rs;
                        }
                        Rstrig++;
                        continue;
                        console.log(Rs);
                    }
                }

            }
            imm = parseInt(inputs[inputs.length - 1]);
        }

        if (instructionType == 'J') {
            if (index == 1) {
                imm = parseInt(inputs[index]);
            }
        }
    }
    console.log(instructionType);
    console.log(imm);
    update();
}

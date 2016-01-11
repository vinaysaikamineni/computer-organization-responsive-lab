var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var img = document.getElementById('cpu');
var rownumber=1;
var imgnumber=2;
var image = document.getElementById('process');
var video = document.getElementById('video');
var opcode;
var Rs=0;
var Rt=0;
var Rd=0;
var Rstrig=0;
var Rttrig=0;
var Rdtrig=0;
var funct;
var instr;
var text;
var sum;			
var instructionCounter=0;
var instructions = ['Write Instructions<br/> Press Load button.','Instructions Loaded<br/> Click Execute button.','Program Counter Updated <br/>Click Next button.','Instruction Fetched <br/>Click Next button.',null,'Control Signals Generated.',null,null,null,null];
var instruction = document.getElementById('instructions');
instruction.innerHTML=instructions[instructionCounter];
function updatereg() {
	var index=0;
	$('#regmemory').find('td').each(function(){
		r[index++]=$(this).find("input").val();
	});
	
}
function change () {
		if(imgnumber==10){
			imgnumber=1;
			instructionCounter=0;
		}
		instructionCounter++;
		//img.src="frames/cpu"+imgnumber+".jpg";
		//image.src="frames/frame"+imgnumber+".mp4";
		if(instructions[instructionCounter]){
		instruction.innerHTML=instructions[instructionCounter];
		} else {
			if (instructionCounter==4) {
				 	text = 'Instruction decoded. R-Type Instruction <br/> Rs = '+parseInt(Rs,2);
					text = text + '<br/> Rd = ' + parseInt(Rd,2);
					text = text + '<br/>Rt = ' + parseInt(Rt,2);
					text = text + '<br/> Imm = 2080'//Need to change this depending on the input.
					instruction.innerHTML=text;
			}
			if(instructionCounter==6) {
					text = 'Instruction Execute.<br/>';
					text = text + '<br/>BusA = ' + r[parseInt(Rs,2)];
					text = text + '<br/>BusB = ' + r[parseInt(Rt,2)];
					text = text + '<br/>Rw = ' + parseInt(Rd,2);
					text = text + '<br/>Extender = 2080';//Need to change this.
					instruction.innerHTML=text;
			}
			if(instructionCounter==7) {
					text = 'ALU  Operation.<br/>';
					text = text + '<br/>Operation = ' + instr;
					text = text + '<br/>ALUin1 = ' + r[parseInt(Rs,2)];
					text = text + '<br/>ALUin2 = ' + r[parseInt(Rt,2)]; 
					instruction.innerHTML=text;
			}
			if(instructionCounter==8) {
					text = 'Memory Read.<br/>';
					text = text + '<br/>ALUout = ' + sum;
					text = text + '<br/>Zero Flag = ' + (sum?0:1);
					text = text + '<br/>Address = ' + sum;
					instruction.innerHTML=text;
			}
			if(instructionCounter==9) {
					text = 'Memory Write.<br/>';
					text = text + '<br/>DataIn = ' + r[parseInt(Rt,2)];
					text = text + '<br/>Mem Address = ' + sum;
					text = text + '<br/>BusW = ' + sum;
					text = text + '<br/>Rw =' + parseInt(Rd,2);
					instruction.innerHTML=text;
					r[parseInt(Rd,2)]=sum;
					var index=0;
					$('#regmemory').find('td').each(function(){
					if(index==parseInt(Rd,2))
					$(this).find("input").val(sum);
					index++;
					});
	
			}
		}
		//video.load();
		//video.play();
		imgnumber++;
	}

	function update(){
		var result = document.getElementById('result');
		console.log(result);
		result.rows[1].cells[1].innerHTML=Rs;	
		result.rows[1].cells[2].innerHTML=Rt;
		if(instr=="add"){
		result.rows[1].cells[5].innerHTML="10000";	
		sum=parseInt(r[parseInt(Rs,2)])+parseInt(r[parseInt(Rt,2)]);
		}
		if(instr=="and"||instr=="or"){
		result.rows[1].cells[5].innerHTML="10010";	
		if(instr == "and") {
			sum=parseInt(r[parseInt(Rs,2)])&parseInt(r[parseInt(Rt,2)]);
		}
		if(instr == "or") {
			sum=parseInt(r[parseInt(Rs,2)])|parseInt(r[parseInt(Rt,2)]);

		}
		}
		if(instr=="sub"){
		result.rows[1].cells[5].innerHTML="10001";	
		sum=parseInt(r[parseInt(Rs,2)])-parseInt(r[parseInt(Rt,2)]);
		}
		document.getElementById('aluctr').innerHTML = instr;
				
	}
function load() {
		var rowname='row'+rownumber;
		var inputs=document.getElementById(rowname).value;
		inputs = inputs.split(/[\s,]+/);
		console.log(inputs);
		instructionCounter++;
		instruction.innerHTML=instructions[instructionCounter];
		for(index in inputs){
			if(inputs[index] == "and"){
				instr="and";			
			}
			if(inputs[	index] == "or"){
				instr="or";
			}
			if(inputs[index] == "add"){
				instr="add";
			}
			if(inputs[index] == "sub"){
				instr="sub";
				}
			if(inputs[index][0]=='r') {
				var number = parseInt(inputs[index].substr(1,inputs[index].length)); 
				if(!Rdtrig){
					Rd=number.toString(2);
					Rdtrig++;
					for(var i=Rd.length;i<5;i++){
						Rd='0'+Rd;
					}
				} else { 
						if(!Rstrig){
						Rs=number.toString(2);
						for(var i=Rs.length;i<5;i++){
						Rs='0'+Rs;
						}
						Rstrig++;
						console.log(Rs);
						} else if(!Rttrig){
						Rt=number.toString(2);
							for(var i=Rt.length;i<5;i++){
								Rt='0'+Rt;
								}
							Rttrig++;
							console.log(Rt);
							}		
					   }
			}
		}
		update();
	}
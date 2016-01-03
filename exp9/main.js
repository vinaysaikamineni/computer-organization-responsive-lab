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
function change () {
		if(imgnumber==10)
			imgnumber=1;
		img.src="frames/cpu"+imgnumber+".jpg";
		image.src="frames/frame"+imgnumber+".mp4";
		video.load();
		video.play();
		imgnumber++;
	}

	function update(){
		var result = document.getElementById('result');
		console.log(result);
		result.rows[1].cells[1].innerHTML=Rs;	
		result.rows[1].cells[2].innerHTML=Rt;
		result.rows[1].cells[3].innerHTML=Rd;
		if(instr=="add"){
		result.rows[1].cells[5].innerHTML="10000";	
		}
		if(instr=="and"||instr=="or"){
		result.rows[1].cells[3].innerHTML="10010";	
		}
		if(instr=="sub"){
		result.rows[1].cells[3].innerHTML="10001";	
		}
	}
function load() {
		var rowname='row'+rownumber;
		var inputs=document.getElementById(rowname).value;
		inputs = inputs.split(/[\s,]+/);
		console.log(inputs);
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
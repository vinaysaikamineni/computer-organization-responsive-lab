/*
	Name:Floating Point Numbers Representation Simulator
	Author:Giritheja
	Description: This converts the given number with given number
				 of exponent bits into Floating point representation
				 of numbers.The input is broken into integral and 
				 fractional part.The binary representation of each 
				 part is found.The two parts are then combined and normalized
				 form is found.The exponent, Mantissa, Sign and bias are also
				 given out.
*/
document.getElementById('resultdiv').style.display='none';
//hiding resultdiv.
// function to clear all set variables and settings different results to null
function clearall() {
	document.getElementById('resultdiv').style.display='none';
	document.getElementById('integral').value = null;
	document.getElementById('fractional').value = null;
	document.getElementById('binarynum').value = null;
	document.getElementById('sign').value = null;	
	document.getElementById('bias').value = null;	
	document.getElementById('max').innerHTML = null;
	document.getElementById('min').innerHTML = null;
	document.getElementById('positiveRange').innerHTML=null;
	document.getElementById('negativeRange').innerHTML=null;	
	document.getElementById('normalized').value = null;
	document.getElementById('mantiss').value=null; 
	document.getElementById('expone').value=null;
	document.getElementById('error0').innerHTML=null;
	document.getElementById('error1').innerHTML=null;
	document.getElementById('error2').innerHTML=null;				
}
//function to convert the input number to normalized form
//with number of bits for exponent as constraint.
function convert() {
	clearall();
	var number = parseFloat(document.getElementById('number').value);
	var expolength = parseInt(document.getElementById('expolength').value);
	var sign=0;
	//To check if the input is within constraints
	if(expolength>6||expolength<1||isNaN(expolength)||isNaN(number)){
		return;
	}
	if(number<0){
		sign=1;
		number=-number;
	}
	document.getElementById('resultdiv').style.display='block';
	var fraclength;
	var fractional;
	var integral;
	var binarystr;
	var binarynumber;
	var binaryintegral;
	var binaryfractional;
	var bias = Math.pow(2,expolength-1)-1;
	var twopower;
	var normalized;
	var expone;
	var mantiss;
	var exponebinary;
	var exponeunderflow=0;
	var exponeoverflow=0;
	var mantissaerror=0;
	//dictionary for max representable numbers.
	var max =[1.96875,3.875,15,224,49152,2147483648];
	fraclength = 8-expolength;
	binarystr = number.toString(2);
	fractional = number-parseInt(number);
	integral = parseInt(number);
	binarynumber = parseFloat(binarystr);
	binaryintegral = parseInt(binarystr);
	binaryfractional = (binarystr).substring((binaryintegral.toString()).length+1,(binaryintegral.toString()).length+9);  	
	document.getElementById('integral').value = binaryintegral;
	document.getElementById('fractional').value = binaryfractional;
	if(binaryfractional.length>0)
		document.getElementById('binarynum').value = binaryintegral+'.'+binaryfractional;
	else
		document.getElementById('binarynum').value = binaryintegral;
	document.getElementById('sign').value = sign;	
	document.getElementById('bias').value = bias;	
	document.getElementById('max').innerHTML = max[expolength-1];
	document.getElementById('min').innerHTML = -max[expolength-1];
	document.getElementById('positiveRange').innerHTML=bias;
	document.getElementById('negativeRange').innerHTML=-bias;	
	//The case where number is greater than 1.The exponent is always greater than zero.
	if(number >= 1) {
			normalized = (binaryintegral.toString()).substring(0,1) + '.';
		for (var i=0 ; i < fraclength ; i++) {
			if(i <=((binaryintegral.toString()).length-2)) {
		 		normalized = normalized + (binaryintegral.toString()).substring(i+1,i+2);
			}else{
				normalized = normalized + binaryfractional.substring(i-binaryintegral.toString().length,i-binaryintegral.toString().length+1);
			}
		
		}
		//adding zeros to the end of the normalized number if the 
		//length is less than 8-bit.
		for (var i=normalized.length;i<=fraclength;i++){
			normalized = normalized+'0';
		}
		twopower = (binaryintegral.toString()).length-1;
		normalized=normalized+" X 2^("+twopower+")";
		document.getElementById('normalized').value = normalized;
		} else {
			//The case where the number is below 1.Then the exponent can be zero
		var firstone;
		for( var i = 2;i < binarystr.length; i++) {
			if(binarystr[i]=='1'){
				firstone=i;
				break;
			}
		}
		normalized='1.';
		for (var i=1; i < fraclength; i++) {
			normalized=normalized+binarystr.substring(firstone+i,firstone+i+1);
		}
		for (var i=normalized.length;i<=fraclength;i++){
			normalized = normalized+'0';
		}
		twopower = 1 - firstone;
		normalized = normalized + " X 2^("+twopower+")";
		document.getElementById('normalized').value = normalized;	
		
	}
	expone = bias + twopower;
	if ( expone < 0 ) {
		exponebinary='0';
		exponeunderflow = 1;
	} else {
		exponebinary = expone.toString(2);
	}
	if ( exponebinary.length > expolength ) {
		exponeoverflow = 1;
	}
	for ( var i = exponebinary.length ; i < expolength ; i++) {
		exponebinary = '0' + exponebinary;
	}	
	mantiss = normalized.substring(2 , fraclength+1);
	if ( mantiss.length < (binarystr.length - (binaryintegral.toString()).length-1) ) {
		mantissaerror=1;
	}

	document.getElementById('mantiss').value=mantiss; 
	document.getElementById('expone').value=expone;
	var bit8 = document.getElementById('bit8').rows[0];
	bit8.cells[0].innerHTML=sign;
	for ( var i = 1 ; i <=expolength ; i++ ) {
		bit8.cells[i].innerHTML = exponebinary[i-1];
		bit8.cells[i].style.color='blue';
	}
	for ( var i = expolength+1; i < 8 ; i++ ) {
		bit8.cells[i].innerHTML = mantiss[i-expolength-1];
		bit8.cells[i].style.color='red';
	} 
	//Checking for errors.
	if(exponeoverflow||exponeunderflow||mantissaerror){
		document.getElementById('error0').innerHTML='cannot';
		if(exponeoverflow)
			document.getElementById('error2').innerHTML='expone overflow';
		if(exponeunderflow)
			document.getElementById('error2').innerHTML='expone underflow';
		if(mantissaerror)
			document.getElementById('error1').innerHTML='Mantissa too small to represent the given number.'
	} else {
		document.getElementById('error0').innerHTML='can';
	}
	
}   
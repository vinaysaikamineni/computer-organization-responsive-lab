/*
	Name:Floating Point Numbers Representation Simulator
*/
function convert(){
	var number = parseFloat(document.getElementById('number').value);
	var expolength = parseInt(document.getElementById('expolength').value);
	console.log(number+expolength);
	var fractional = number-parseInt(number);
	var integral = parseInt(number);
	var binarystr = number.toString(2);
	var binarynumber = parseFloat(binarystr);
	var binaryintegral = parseInt(binarystr); 
	var binaryfractional = ((binarynumber-parseInt(binarystr)).toString()).substring(3,11);  
	document.getElementById('integral').value = binaryintegral;
	document.getElementById('fractional').value = binaryfractional;
	document.getElementById('binarynum').value = binaryintegral+'.'+binaryfractional;
}
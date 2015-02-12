var SmlFile = require('./lib/SmlFile');

var stream = new Buffer('1b1b1b1b010101017606353432313062006200726301017601080500153b022e3905353432390a01a81538107804010201016344f500', 'hex');

smlFile = new SmlFile()
try{
	smlFile.parse(stream);
	console.log(smlFile.toString());
	
	//smlFile.save("PATH_TO_FILE");
	
	//SmlFile.open("PATH_TO_FILE")
} catch (error) {
	console.log(error);
}

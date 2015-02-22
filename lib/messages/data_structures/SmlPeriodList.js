var SmlPeriodEntry = require('./SmlPeriodEntry');

function SmlPeriodList(){
	this.periodEntries = [];
};

SmlPeriodList.prototype.write = function write(buffer){
	
};

SmlPeriodList.prototype.addPeriodEntry = function addPeriodEntry(value){
	this.periodEntries[this.periodEntries.length]=value;
};

SmlPeriodList.prototype.getPeriodEntries = function getPeriodEntries(){
	return this.periodEntries;
};

SmlPeriodList.prototype.toString = function toString(){	
	var str = "[\n";
	for(periodEntry in this.periodEntries){
		str += this.periodEntries[periodEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlPeriodList.parse = function parse(buffer){
	
	var smlPeriodList = new SmlPeriodList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlPeriodList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlPeriodList.addPeriodEntry(SmlPeriodEntry.parse(buffer));
	}
	
	return smlPeriodList;
	
};

module.exports = SmlPeriodList;
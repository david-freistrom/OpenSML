var SmlValueListEntry = require('./SmlValueListEntry');

function SmlValueList(){
	this.listEntries = [];
};

SmlValueList.prototype.write = function write(buffer){
	
};

SmlValueList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlValueList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlValueList.parse = function parse(buffer){
	
	var smlValueList = new SmlValueList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlValueList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlValueList.addListEntry(SmlValueListEntry.parse(buffer));
	}
	
	return smlValueList;
	
};

module.exports = SmlValueList;
var SmlListEntry = require('./SmlListEntry');

function SmlList(){
	this.listEntries = [];
};

SmlList.prototype.write = function write(buffer){
	
};

SmlList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
}

SmlList.parse = function parse(buffer){
	
	var smlList = new SmlList();
	var tlField = buffer.readTLField();
	
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlList!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlList.addListEntry(SmlListEntry.parse(buffer));
	}
	
	return smlList;
	
};

module.exports = SmlList;
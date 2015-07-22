var SmlListEntry = require('./SmlListEntry');

function SmlList(){
	this.listEntries = [];
};

SmlList.prototype.getSize = function getSize(){
	var size = 1;
	for(listEntry in this.listEntries){
		size += this.listEntries[listEntry].getSize();
	}
	return size;
};

SmlList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlList.prototype.write = function write(buffer){
	buffer.writeUInt8(0x70+this.periodListEntries.length); // SEQUENZ
	for(periodListEntry in this.periodListEntries){
		this.periodListEntries[periodListEntry].write(buffer);
	}
};

SmlList.prototype.toString = function toString(){	
	var str = "[\n";
	for(listEntry in this.listEntries){
		str += this.listEntries[listEntry].toString()+", \n";
	}
	
	str+="]";
	return str;
};

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
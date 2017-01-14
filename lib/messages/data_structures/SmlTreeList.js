/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

function SmlTreeList(){
	this.listEntries = [];
}

SmlTreeList.prototype.getSize = function getSize(){
	var size = 1;
	for(var listEntry in this.listEntries){
		size += this.listEntries[listEntry].getSize();
	}
	return size;
};

SmlTreeList.prototype.write = function write(buffer){
	buffer.writeUInt8(0x70+this.listEntries.length); // SEQUENZ
	for(var listEntries in this.listEntries){
		this.listEntries[listEntrie].write(buffer);
	}
};

SmlTreeList.prototype.addListEntry = function addListEntry(value){
	this.listEntries[this.listEntries.length]=value;
};

SmlTreeList.prototype.toString = function toString(){
	var str = "[\n";
	for(var listEntry in this.listEntries){
		str += "\t\t\t\t\tList-Entry: "+this.listEntries[listEntry].toString()+", \n";
	}

	str+="]";
	return str;
};

SmlTreeList.parse = function parse(buffer){
	var tlField = buffer.readTLField();

	// OPTIONAL
	if(tlField.type===0x00 && tlField.length===0x01){
		return undefined;
	}

	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlTreeList!");
	}
	var smlTreeList = new SmlTreeList();

	for(var i=0; i<tlField.length; i++){
		smlTreeList.addListEntry(require('./SmlTree').parse(buffer));
	}

	return smlTreeList;

};

module.exports = SmlTreeList;

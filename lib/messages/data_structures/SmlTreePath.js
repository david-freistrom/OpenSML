var Constants = require('../../Constants');

function SmlTreePath(){
	this.pathEntries=[];
};

SmlTreePath.prototype.addPathEntry = function addPathEntry(pathEntry){
	this.pathEntries.push(pathEntry);
};

SmlTreePath.prototype.getPathEntries = function getPathEntries(){
	return this.pathEntries;
}

SmlTreePath.prototype.toString = function toString(){
	var str = "[";
	for(pathEntry in this.pathEntries){
		str += this.pathEntries[pathEntry].toString('hex')+", ";
	}
	str +="]"
	return str;
};

SmlTreePath.prototype.getSize = function getSize(){
	var size = 1;
	for(pathEntry in this.pathEntries){
		size += 1+this.pathEntries[pathEntry].length;
	}
	return size;
};

SmlTreePath.prototype.write = function write(buffer){
	buffer.writeUInt8(0x70+this.pathEntries.length); // SEQUENZ
	for(pathEntry in this.pathEntries){
		buffer.writeOctetString(this.pathEntries[pathEntry]);
	}
};

SmlTreePath.parse = function parse(buffer){
	var smlTreePath = new SmlTreePath();
	var tlField = buffer.readTLField();
		
	if(tlField.type!=0x07){
		throw new Error("Unknown TL-Field for SmlTreePath!");
	}
	
	for(var i=0; i<tlField.length; i++){
		smlTreePath.pathEntries[i]=buffer.readOctetString();
	}
	
	return smlTreePath;
};

module.exports = SmlTreePath;
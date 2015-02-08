function SmlValueEntry(){
	this.value = undefined;
	this.valueSignature = undefined;
};

SmlValueEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlValueEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlValueEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlValueEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlValueEntry.prototype.write = function write(buffer){
	
};

SmlValueEntry.parse = function parse(buffer){
	
};

module.exports = SmlValueEntry;
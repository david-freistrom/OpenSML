function SmlValueListEntry(){
	this.value = undefined;
	this.valueSignature = undefined;
};

SmlValueListEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlValueListEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlValueListEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlValueListEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlValueListEntry.prototype.write = function write(buffer){
	
};

SmlValueListEntry.prototype.toString = function toString(){
	var str = "";

	return str;
};

SmlValueListEntry.parse = function parse(buffer){
	var smlValueListEntry = new SmlValueListEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07 && tlField.length != 0x04){
		throw new Error("Unknown TL-Field for SmlValueListEntry!");
	}
	
	smlValueEntry.setValue(buffer.readSmlValue());
	smlValueEntry.setValueSignature(buffer.readOctetString());
	
	return smlValueEntry;
};

module.exports = SmlValueListEntry;
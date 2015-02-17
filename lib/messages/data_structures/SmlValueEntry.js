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
	var smlValueEntry = new SmlValueEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07 && tlField.length != 0x04){
		throw new Error("Unknown TL-Field for SmlValueEntry!");
	}
	
	smlValueEntry.setValue(buffer.readSmlValue());
	smlValueEntry.setValueSignature(buffer.readOctetString());
	
	return smlValueEntry;
};

module.exports = SmlValueEntry;
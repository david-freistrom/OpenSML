function SmlPeriodEntry(){
	this.objName = undefined;
	this.unit = undefined;
	this.scaler = undefined;
	this.value = undefined;
	this.valueType = undefined;
	this.valueSignature = undefined;
};

SmlPeriodEntry.prototype.getObjName = function getObjName(){
	return this.objName;
};

SmlPeriodEntry.prototype.setObjName = function setObjName(value){
	this.objName = value;
};

SmlPeriodEntry.prototype.getUnit = function getUnit(){
	return this.unit;
};

SmlPeriodEntry.prototype.setUnit = function setUnit(value){
	this.unit = value;
};

SmlPeriodEntry.prototype.getScaler = function getScaler(){
	return this.scalar;
};

SmlPeriodEntry.prototype.setScaler = function setScaler(value){
	this.scalar = value;
};

SmlPeriodEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlPeriodEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlPeriodEntry.prototype.getValueType = function getValueType(){
	return this.valueType;
};

SmlPeriodEntry.prototype.setValueType = function setValueType(value){
	this.valueType = value;
};


SmlPeriodEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlPeriodEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlPeriodEntry.prototype.write = function write(buffer){
	
};

SmlPeriodEntry.prototype.toString = function toString(){
	var str = "";
	str += "Obj-Name: "+this.objName.toString('hex')+"\n";
	str += "Unit: "+this.unit+"\n";
	str += "Scaler: "+this.scaler+"\n";
	str += "Value: "+this.value+"\n";
	str += "Value-Signature: "+this.valueSignature.toString('hex')+"\n";
	return str;
};

SmlPeriodEntry.parse = function parse(buffer){
	
	var smlPeriodEntry = new SmlPeriodEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07){
		throw new Error("Unknown TL-Field for SmlPeriodEntry!");
	}
	
	smlPeriodEntry.setObjName(buffer.readOctetString());
	smlPeriodEntry.setUnit(buffer.readUnsigned());
	smlPeriodEntry.setScaler(buffer.readInteger());
	smlPeriodEntry.setValue(buffer.readSmlValue());
	smlPeriodEntry.setValueSignature(buffer.readOctetString());
	
	return smlPeriodEntry;
	
};

module.exports = SmlPeriodEntry;
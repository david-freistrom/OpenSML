function SmlPeriodListEntry(){
	this.objName = undefined;
	this.unit = undefined;
	this.scaler = undefined;
	this.value = undefined;
	this.valueType = undefined;
	this.valueSignature = undefined;
};

SmlPeriodListEntry.prototype.getObjName = function getObjName(){
	return this.objName;
};

SmlPeriodListEntry.prototype.setObjName = function setObjName(value){
	this.objName = value;
};

SmlPeriodListEntry.prototype.getUnit = function getUnit(){
	return this.unit;
};

SmlPeriodListEntry.prototype.setUnit = function setUnit(value){
	this.unit = value;
};

SmlPeriodListEntry.prototype.getScaler = function getScaler(){
	return this.scaler;
};

SmlPeriodListEntry.prototype.setScaler = function setScaler(value){
	this.scaler = value;
};

SmlPeriodListEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlPeriodListEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlPeriodListEntry.prototype.getValueType = function getValueType(){
	return this.valueType;
};

SmlPeriodListEntry.prototype.setValueType = function setValueType(value){
	this.valueType = value;
};


SmlPeriodListEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlPeriodListEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlPeriodListEntry.prototype.write = function write(buffer){
	
};

SmlPeriodListEntry.prototype.toString = function toString(){
	var str = "";
	str += "\t\t\t\tObj-Name: "+this.objName.toString('hex')+"\n";
	str += "\t\t\t\tUnit: "+this.unit+"\n";
	str += "\t\t\t\tScaler: "+this.scaler+"\n";
	if(this.unit==255 && this.value !=undefined){
		str += "\t\t\t\tValue: "+this.value.toString()+"\n";
	} else {
		str += "\t\t\t\tValue: "+this.value+"\n";
	}
	str += "\t\t\t\tValue-Signature: "+this.valueSignature.toString('hex')+"\n";
	return str;
};

SmlPeriodListEntry.parse = function parse(buffer){
	
	var smlPeriodListEntry = new SmlPeriodListEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07){
		throw new Error("Unknown TL-Field for SmlPeriodListEntry!");
	}
	
	smlPeriodListEntry.setObjName(buffer.readOctetString());
	smlPeriodListEntry.setUnit(buffer.readUnsigned());
	smlPeriodListEntry.setScaler(buffer.readInteger());
	smlPeriodListEntry.setValue(buffer.readSmlValue());
	smlPeriodListEntry.setValueSignature(buffer.readOctetString());
	
	return smlPeriodListEntry;
	
};

module.exports = SmlPeriodListEntry;
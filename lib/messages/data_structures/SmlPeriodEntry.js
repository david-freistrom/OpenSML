function SmlPeriodEntry(){
	this.objName = undefined;
	this.unit = new SmlUnit();
	this.scaler = undefined;
	this.value = undefined;
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

SmlPeriodEntry.prototype.getScalar = function getScalar(){
	return this.scalar;
};

SmlPeriodEntry.prototype.setScalar = function setScalar(value){
	this.scalar = value;
};

SmlPeriodEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlPeriodEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlPeriodEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlPeriodEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlPeriodEntry.prototype.write = function write(buffer){
	
};

SmlPeriodEntry.parse = function parse(buffer){
	
};

module.exports = SmlPeriodEntry;
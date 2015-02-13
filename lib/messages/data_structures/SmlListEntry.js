function SmlListEntry(){
	this.objName = undefined;
	this.status = new SmlUnit();
	this.valTime = undefined;
	this.unit = undefined;
	this.scaler = undefined;
	this.value = undefined;
	this.valueSignature = undefined;
};

SmlListEntry.prototype.getObjName = function getObjName(){
	return this.objName;
};

SmlListEntry.prototype.setObjName = function setObjName(value){
	this.objName = value;
};

SmlListEntry.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlListEntry.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlListEntry.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlListEntry.prototype.setValTime = function setValTime(value){
	this.valTime = value;
};

SmlListEntry.prototype.getUnit = function getUnit(){
	return this.unit;
};

SmlListEntry.prototype.setUnit = function setUnit(value){
	this.unit = value;
};

SmlListEntry.prototype.getScalar = function getScalar(){
	return this.scaler;
};

SmlListEntry.prototype.setScalar = function setScalar(value){
	this.scaler = value;
};

SmlListEntry.prototype.getValue = function getValue(){
	return this.value;
};

SmlListEntry.prototype.setValue = function setValue(value){
	this.value = value;
};

SmlListEntry.prototype.getValueSignature = function getValueSignature(){
	return this.valueSignature;
};

SmlListEntry.prototype.setValueSignature = function setValueSignature(value){
	this.valueSignature = value;
};

SmlListEntry.prototype.write = function write(buffer){
	
};

SmlListEntry.parse = function parse(buffer){
	
};

module.exports = SmlListEntry;
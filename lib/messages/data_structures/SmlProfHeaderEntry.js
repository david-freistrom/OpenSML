function SmlProfHeaderEntry(){
	this.objName = undefined;
	this.unit = new SmlUnit();
	this.scaler = undefined;
};

SmlProfHeaderEntry.prototype.getObjName = function getObjName(){
	return this.objName;
};

SmlProfHeaderEntry.prototype.setObjName = function setObjName(value){
	this.objName = value;
};

SmlProfHeaderEntry.prototype.getUnit = function getUnit(){
	return this.unit;
};

SmlProfHeaderEntry.prototype.setUnit = function setUnit(value){
	this.unit = value;
};

SmlProfHeaderEntry.prototype.getScalar = function getScalar(){
	return this.scaler;
};

SmlProfHeaderEntry.prototype.setScalar = function setScalar(value){
	this.scaler = value;
};

SmlProfHeaderEntry.prototype.write = function write(buffer){
	
};

SmlProfHeaderEntry.parse = function parse(buffer){
	
};

module.exports = SmlProfHeaderEntry;
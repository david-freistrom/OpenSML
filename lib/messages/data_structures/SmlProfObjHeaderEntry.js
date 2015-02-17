function SmlProfObjHeaderEntry(){
	this.objName = undefined;
	this.unit = new SmlUnit();
	this.scaler = undefined;
};

SmlProfObjHeaderEntry.prototype.getObjName = function getObjName(){
	return this.objName;
};

SmlProfObjHeaderEntry.prototype.setObjName = function setObjName(value){
	this.objName = value;
};

SmlProfObjHeaderEntry.prototype.getUnit = function getUnit(){
	return this.unit;
};

SmlProfObjHeaderEntry.prototype.setUnit = function setUnit(value){
	this.unit = value;
};

SmlProfObjHeaderEntry.prototype.getScalar = function getScalar(){
	return this.scaler;
};

SmlProfObjHeaderEntry.prototype.setScalar = function setScalar(value){
	this.scaler = value;
};

SmlProfObjHeaderEntry.prototype.write = function write(buffer){
	
};

SmlProfObjHeaderEntry.parse = function parse(buffer){
	
};

module.exports = SmlProfObjHeaderEntry;
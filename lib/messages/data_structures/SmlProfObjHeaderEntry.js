function SmlProfObjHeaderEntry(){
	this.objName = undefined;
	this.unit = undefined;
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
	var smlProfObjHeaderEntry = new SmlProfObjHeaderEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07 && tlField.length != 0x03){
		throw new Error("Unknown TL-Field for SmlProfObjHeaderEntry!");
	}
	
	smlProfObjHeaderEntry.setObjName(buffer.readOctetString());
	smlProfObjHeaderEntry.setUnit(buffer.readUnsigned());
	smlProfObjHeaderEntry.setScaler(buffer.readInteger());
	
	return smlProfObjHeaderEntry;
};

module.exports = SmlProfObjHeaderEntry;
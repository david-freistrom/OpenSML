var SmlTime = require('./SmlTime');
var SmlValueList = require('./SmlValueList');

function SmlProfObjPeriodEntry(){
	this.valTime = undefined;
	this.status = undefined;
	this.valueList = undefined;
	this.periodSignature = undefined;
};

SmlProfObjPeriodEntry.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlProfObjPeriodEntry.prototype.getValTime = function getValTime(value){
	this.valTime = value;
};

SmlProfObjPeriodEntry.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlProfObjPeriodEntry.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlProfObjPeriodEntry.prototype.getValueList = function getValueList(){
	return this.valueList;
};

SmlProfObjPeriodEntry.prototype.setValueList = function setValueList(value){
	this.valueList = value;
};

SmlProfObjPeriodEntry.prototype.getPeriodSignature = function getPeriodSignature(){
	return this.periodSignature;
};

SmlProfObjPeriodEntry.prototype.setPeriodSignature = function setPeriodSignature(value){
	this.periodSignature = value;
};

SmlProfObjPeriodEntry.prototype.toString = function toString(){
	var str = "";
	str += "Val-Time: "+this.valTime+"\n";
	str += ""
	return str;
};


SmlProfObjPeriodEntry.prototype.write = function write(buffer){
	
};

SmlProfObjPeriodEntry.parse = function parse(buffer){
	var smlProfObjPeriodEntry = new SmlProfObjPeriodEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07 && tlField.length != 0x04){
		throw new Error("Unknown TL-Field for SmlProfObjPeriodEntry!");
	}
	
	smlProfObjPeriodEntry.setValTime(SmlTime.parse(buffer));
	smlProfObjPeriodEntry.setStatus(buffer.readUnsigned());
	smlProfObjPeriodEntry.setValueList(SmlValueList.parse(buffer));
	smlProfObjPeriodEntry.setPeriodSignature(buffer.readOctetString());
	
	return smlProfObjPeriodEntry;
};

module.exports = SmlProfObjPeriodEntry;
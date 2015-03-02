var SmlTime = require('./SmlTime');
var SmlValueList = require('./SmlValueList');

function SmlProfObjPeriodListEntry(){
	this.valTime = undefined;
	this.status = undefined;
	this.valueList = undefined;
	this.periodSignature = undefined;
};

SmlProfObjPeriodListEntry.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlProfObjPeriodListEntry.prototype.getValTime = function getValTime(value){
	this.valTime = value;
};

SmlProfObjPeriodListEntry.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlProfObjPeriodListEntry.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlProfObjPeriodListEntry.prototype.getValueList = function getValueList(){
	return this.valueList;
};

SmlProfObjPeriodListEntry.prototype.setValueList = function setValueList(value){
	this.valueList = value;
};

SmlProfObjPeriodListEntry.prototype.getPeriodSignature = function getPeriodSignature(){
	return this.periodSignature;
};

SmlProfObjPeriodListEntry.prototype.setPeriodSignature = function setPeriodSignature(value){
	this.periodSignature = value;
};

SmlProfObjPeriodListEntry.prototype.toString = function toString(){
	var str = "";
	str += "Val-Time: "+this.valTime+"\n";
	str += ""
	return str;
};


SmlProfObjPeriodListEntry.prototype.write = function write(buffer){
	
};

SmlProfObjPeriodListEntry.parse = function parse(buffer){
	var smlProfObjPeriodListEntry = new SmlProfObjPeriodListEntry();
	var tlField = buffer.readTLField();
	
	if(tlField.type != 0x07 && tlField.length != 0x04){
		throw new Error("Unknown TL-Field for SmlProfObjPeriodListEntry!");
	}
	
	smlProfObjPeriodEntry.setValTime(SmlTime.parse(buffer));
	smlProfObjPeriodEntry.setStatus(buffer.readUnsigned());
	smlProfObjPeriodEntry.setValueList(SmlValueList.parse(buffer));
	smlProfObjPeriodEntry.setPeriodSignature(buffer.readOctetString());
	
	return smlProfObjPeriodEntry;
};

module.exports = SmlProfObjPeriodListEntry;
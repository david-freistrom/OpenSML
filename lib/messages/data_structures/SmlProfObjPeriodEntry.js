function SmlProfObjPeriodEntry(){
	this.valTime = undefined;
	this.status = new SmlUnit();
	this.valueList = [SmlValueEntry];
	this.periodSignature = new SmlSignature();
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
	
};

module.exports = SmlProfObjPeriodEntry;
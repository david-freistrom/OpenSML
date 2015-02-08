function SmlProfPeriodEntry(){
	this.valTime = undefined;
	this.status = new SmlUnit();
	this.valueList = [SmlValueEntry];
	this.periodSignature = new SmlSignature();
};

SmlProfPeriodEntry.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlProfPeriodEntry.prototype.getValTime = function getValTime(value){
	this.valTime = value;
};

SmlProfPeriodEntry.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlProfPeriodEntry.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlProfPeriodEntry.prototype.getValueList = function getValueList(){
	return this.valueList;
};

SmlProfPeriodEntry.prototype.setValueList = function setValueList(value){
	this.valueList = value;
};

SmlProfPeriodEntry.prototype.getPeriodSignature = function getPeriodSignature(){
	return this.periodSignature;
};

SmlProfPeriodEntry.prototype.setPeriodSignature = function setPeriodSignature(value){
	this.periodSignature = value;
};

SmlProfPeriodEntry.prototype.write = function write(buffer){
	
};

SmlProfPeriodEntry.parse = function parse(buffer){
	
};

module.exports = SmlProfPeriodEntry;
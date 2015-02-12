function SmlGetProfilePackResponse(){
	this.serverId = undefined;
	this.actTime = undefined;
	this.regPeriod = undefined;
	this.parameterTreePath = new SmlTreePath();
	this.headerList = [ProfObjHeaderEntry];
	this.periodList = [ProfObjPeriodEntry];
	this.rawdata = undfined;
	this.profileSignature = new SmlSignature();
};

SmlGetProfilePackResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfilePackResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfilePackResponse.prototype.getActTime = function getActTime(){
	return this.actTime;
};

SmlGetProfilePackResponse.prototype.setActTime = function setActTime(value){
	this.actTime = value;
};

SmlGetProfilePackResponse.prototype.getRegPeriod = function getRegPeriod(){
	return this.regPeriod;
};

SmlGetProfilePackResponse.prototype.setRegPeriod = function setRegPeriod(value){
	this.regPeriod = value;
};

SmlGetProfilePackResponse.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfilePackResponse.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfilePackResponse.prototype.getHeaderList = function getHeaderList(){
	return this.headerList;
};

SmlGetProfilePackResponse.prototype.setHeaderList = function setHeaderList(value){
	this.headerList = value;
};

SmlGetProfilePackResponse.prototype.getPeriodList = function getPeriodList(){
	return this.periodList;
};

SmlGetProfilePackResponse.prototype.setPeriodList = function setPeriodList(value){
	this.periodList = value;
};

SmlGetProfilePackResponse.prototype.isRawdata = function isRawdata(){
	return this.rawdata;
};

SmlGetProfilePackResponse.prototype.setRawdata = function setRawdata(value){
	this.rawdata = value;
};

SmlGetProfilePackResponse.prototype.getProfileSignature = function getProfileSignature(){
	return this.profileSignature;
};

SmlGetProfilePackResponse.prototype.setProfileSignature = function setProfileSignature(value){
	this.profileSignature = value;
};

SmlGetProfilePackResponse.prototype.write = function write(buffer){
	
};

SmlGetProfilePackResponse.parse = function parse(buffer){
	
};

module.exports = SmlGetProfilePackResponse;
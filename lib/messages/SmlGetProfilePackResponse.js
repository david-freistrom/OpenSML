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

SmlGetProfileListResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfileListResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfileListResponse.prototype.getActTime = function getActTime(){
	return this.actTime;
};

SmlGetProfileListResponse.prototype.setActTime = function setActTime(value){
	this.actTime = value;
};

SmlGetProfileListResponse.prototype.getRegPeriod = function getRegPeriod(){
	return this.regPeriod;
};

SmlGetProfileListResponse.prototype.setRegPeriod = function setRegPeriod(value){
	this.regPeriod = value;
};

SmlGetProfileListResponse.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfileListResponse.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfileListResponse.prototype.getHeaderList = function getHeaderList(){
	return this.headerList;
};

SmlGetProfileListResponse.prototype.setHeaderList = function setHeaderList(value){
	this.headerList = value;
};

SmlGetProfileListResponse.prototype.getPeriodList = function getPeriodList(){
	return this.periodList;
};

SmlGetProfileListResponse.prototype.setPeriodList = function setPeriodList(value){
	this.periodList = value;
};

SmlGetProfileListResponse.prototype.isRawdata = function isRawdata(){
	return this.rawdata;
};

SmlGetProfileListResponse.prototype.setRawdata = function setRawdata(value){
	this.rawdata = value;
};

SmlGetProfileListResponse.prototype.getProfileSignature = function getProfileSignature(){
	return this.profileSignature;
};

SmlGetProfileListResponse.prototype.setProfileSignature = function setProfileSignature(value){
	this.profileSignature = value;
};

SmlGetProfileListResponse.prototype.write = function write(buffer){
	
};

SmlGetProfileListResponse.parse = function parse(buffer){
	
};

module.exports = SmlGetProfileListResponse;
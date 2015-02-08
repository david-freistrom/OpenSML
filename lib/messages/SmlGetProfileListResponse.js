function SmlGetProfileListResponse(){
	this.serverId = undefined;
	this.actTime = undefined;
	this.regPeriod = undefined;
	this.parameterTreePath = undefined;
	this.valTime = undefined;
	this.status = undefined;
	this.periodList = undefined;
	this.rawdata = undefined;
	this.periodSignature = undefined;
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

SmlGetProfileListResponse.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlGetProfileListResponse.prototype.setValTime = function setValTime(value){
	this.valTime = value;
};

SmlGetProfileListResponse.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlGetProfileListResponse.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlGetProfileListResponse.prototype.getPeriodList = function getPeriodList(){
	return this.periodList;
};

SmlGetProfileListResponse.prototype.setPeriodList = function setPeriodList(value){
	this.periodList = value;
};

SmlGetProfileListResponse.prototype.getRawdata = function getRawdata(){
	return this.rawdata;
};

SmlGetProfileListResponse.prototype.setRawdata = function setRawdata(value){
	this.rawdata = value;
};

SmlGetProfileListResponse.prototype.getPeriodSignature = function getPeriodSignature(){
	return this.periodSignature;
};

SmlGetProfileListResponse.prototype.setPeriodSignature = function setPeriodSignature(value){
	this.periodSignature = value;
};

SmlGetProfileListResponse.prototype.write = function write(buffer){
	
};

SmlGetProfileListResponse.parse = function parse(buffer){
	
};

module.exports = SmlGetProfileListResponse;
function SmlGetProfileListRequest(){
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.withRawdata = undefined;
	this.beginTime = undefined;
	this.endTime = undefined;
	this.parameterTreePath = undefined;
	this.objectList = undefined;
	this.dasDetails = undefined;
};

SmlGetProfileListRequest.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfileListRequest.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfileListRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlGetProfileListRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlGetProfileListRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlGetProfileListRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlGetProfileListRequest.prototype.isWithRawdata = function isWithRawdata(){
	return this.withRawdata;
};

SmlGetProfileListRequest.prototype.setWithRawdata = function setWithRawdata(value){
	this.withRawdata = value;
};

SmlGetProfileListRequest.prototype.getBeginTime = function getBeginTime(){
	return this.beginTime;
};

SmlGetProfileListRequest.prototype.setBeginTime = function setBeginTime(value){
	this.beginTime = value;
};

SmlGetProfileListRequest.prototype.getEndTime = function getEndTime(){
	return this.endTime;
};

SmlGetProfileListRequest.prototype.setEndTime = function setEndTime(value){
	this.endTime = value;
};

SmlGetProfileListRequest.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfileListRequest.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfileListRequest.prototype.getObjectList = function getObjectList(){
	return this.objectList;
};

SmlGetProfileListRequest.prototype.setObjectList = function setObjectList(value){
	this.objectList = value;
};

SmlGetProfileListRequest.prototype.getDasDetails = function getDasDetails(){
	return this.dasDetails;
};

SmlGetProfileListRequest.prototype.setDasDetails = function setDasDetails(value){
	this.dasDetails = value;
};


SmlGetProfileListRequest.prototype.write = function write(buffer){
	
};

SmlGetProfileListRequest.parse = function parse(buffer){
	
};

module.exports = SmlGetProfileListRequest;
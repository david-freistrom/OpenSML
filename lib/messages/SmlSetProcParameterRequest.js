function SmlSetProcParameterRequest(){
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.parameterTreePath = undefined;
	this.parameterTree = undefined;
};

SmlSetProcParameterRequest.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlSetProcParameterRequest.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlSetProcParameterRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlSetProcParameterRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlSetProcParameterRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlSetProcParameterRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlSetProcParameterRequest.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlSetProcParameterRequest.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlSetProcParameterRequest.prototype.getParameterTree = function getParameterTree(){
	return this.parameterTree;
};

SmlSetProcParameterRequest.prototype.setParameterTree = function setParameterTree(value){
	this.parameterTree = value;
};

SmlSetProcParameterRequest.prototype.write = function write(buffer){
	
};

SmlSetProcParameterRequest.parse = function parse(buffer){
	
};

module.exports = SmlSetProcParameterRequest;
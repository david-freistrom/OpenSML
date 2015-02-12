function SmlGetProcParameterResponse(){
	this.serverId = undefined;
	this.parameterTreePath = undefined;
	this.parameterTree = undefined;
};

SmlGetProcParameterResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProcParameterResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProcParameterResponse.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProcParameterResponse.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProcParameterResponse.prototype.getParameterTree = function getParameterTree(){
	return this.parameterTree;
};

SmlGetProcParameterResponse.prototype.setParameterTree = function setParameterTree(value){
	this.parameterTree = value;
};

SmlGetProcParameterResponse.prototype.write = function write(buffer){
	
};

SmlGetProcParameterResponse.parse = function parse(buffer){
	
};

module.exports = SmlGetProcParameterResponse;
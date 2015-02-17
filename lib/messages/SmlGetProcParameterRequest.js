var SmlTreePath = require('./data_structures/SmlTreePath');

function SmlGetProcParameterRequest(){
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.parameterTreePath = undefined;
	this.attribute = undefined;
};

SmlGetProcParameterRequest.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProcParameterRequest.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProcParameterRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlGetProcParameterRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlGetProcParameterRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlGetProcParameterRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlGetProcParameterRequest.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProcParameterRequest.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProcParameterRequest.prototype.getAttribute = function getAttribute(){
	return this.attribute;
};

SmlGetProcParameterRequest.prototype.setAttribute = function setAttribute(value){
	this.attribute = value;
};

SmlGetProcParameterRequest.prototype.write = function write(buffer){
	
};

SmlGetProcParameterRequest.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x05){
		var smlGetProcParameterRequest = new SmlGetProcParameterRequest();
		smlGetProcParameterRequest.setServerId(buffer.readOctetString());
		smlGetProcParameterRequest.setUsername(buffer.readOctetString());
		smlGetProcParameterRequest.setPassword(buffer.readOctetString);
		smlGetProcParameterRequest.setParameterTreePath(SmlTreePath.parse(buffer));
		smlGetProcParameterRequest.setAttribute(buffer.readOctetString());
		return smlGetProcParameterRequest;
	} else {
		throw new Error("Unknown TL-Field for SmlGetProcParameterRequest!");
	}
};

module.exports = SmlGetProcParameterRequest;
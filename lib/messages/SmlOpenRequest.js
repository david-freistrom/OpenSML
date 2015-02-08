function SmlOpenRequest(){	
	this.codepage = undefined;
	this.clientId = new OctetString();
	this.reqField = new OctetString();
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.smlVersion = undefined;
};

SmlOpenRequest.prototype.getCodepage = function getCodepage(){
	return this.codepage;
};

SmlOpenRequest.prototype.setCodepage = function setCodepage(value){
	this.codepage = value;
};

SmlOpenRequest.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlOpenRequest.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlOpenRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlOpenRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlOpenRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlOpenRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlOpenRequest.prototype.getSmlVersion = function getSmlVersion(){
	return this.smlVersion;
};

SmlOpenRequest.prototype.setSmlVersion = function setSmlVersion(value){
	this.smlVersion = value;
};

SmlOpenRequest.prototype.write = function write(buffer){
	
};

SmlOpenRequest.parse = function parse(buffer){
	
};

module.exports = SmlOpenRequest;
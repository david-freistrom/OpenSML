function SmlOpenResponse(){
	this.codepage = undefined;
	this.clientId = undefined;
	this.reqField = new OctetString();
	this.serverId = new OctetString();
	this.refTime = new SmlTime();
	this.smlVersion = undefined;
};

SmlOpenResponse.prototype.getCodepage = function getCodepage(){
	return this.codepage;
};

SmlOpenResponse.prototype.setCodepage = function setCodepage(value){
	this.codepage = value;
};

SmlOpenResponse.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlOpenResponse.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlOpenResponse.prototype.getReqField = function getReqField(){
	return this.reqField;
};

SmlOpenResponse.prototype.setReqField = function setReqField(value){
	this.reqField = value;
};

SmlOpenResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlOpenResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlOpenResponse.prototype.getRefTime = function getRefTime(){
	return this.refTime;
};

SmlOpenResponse.prototype.setRefTime = function setRefTime(value){
	this.refTime = value;
};

SmlOpenResponse.prototype.getSmlVersion = function getSmlVersion(){
	return this.smlVersion;
};

SmlOpenResponse.prototype.setSmlVersion = function setSmlVersion(value){
	this.smlVersion = value;
};

SmlOpenResponse.prototype.write = function write(buffer){
	
};

SmlOpenResponse.parse = function parse(buffer){
	
};

module.exports = SmlOpenResponse;
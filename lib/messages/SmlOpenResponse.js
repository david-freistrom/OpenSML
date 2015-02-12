var SmlTime = require('./data_structures/SmlTime');

function SmlOpenResponse(){
	this.codepage = undefined;
	this.clientId = undefined;
	this.reqField = undefined;
	this.serverId = undefined;
	this.refTime = undefined;
	this.smlVersion = 1;
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

SmlOpenResponse.prototype.toString = function toString(){
	var str = "";
	str += "Codepage: "+this.codepage+"\n";
	str += "Client-ID: "+this.clientId.toString('hex')+"\n";
	str += "Req-Field: "+this.reqField+"\n";
	str += "Server-ID: "+this.serverId.toString('hex')+"\n";
	if(this.refTime!=undefined){
		str += this.refTime.toString()
	}
	str += "Sml-Version: "+this.smlVersion+"\n";
	return str;
};

SmlOpenResponse.parse = function parse(buffer){
	var smlOpenResponse = new SmlOpenResponse();
	
	if(buffer.readTLField()==0x07,0x06){				
		smlOpenResponse.setCodepage(buffer.readOctetString());	
		smlOpenResponse.setClientId(buffer.readOctetString());	
		smlOpenResponse.setReqField(buffer.readOctetString());	
		smlOpenResponse.setServerId(buffer.readOctetString());
		smlOpenResponse.setRefTime(SmlTime.parse(buffer));		
		smlOpenResponse.setSmlVersion(buffer.readUnsigned());	
	} else {
		throw new Error("Unknown TL-Field for SmlOpenResponse!");
	}
	
	return smlOpenResponse;
};

module.exports = SmlOpenResponse;
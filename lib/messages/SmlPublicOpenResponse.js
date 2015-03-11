var SmlTime = require('./data_structures/SmlTime');

function SmlPublicOpenResponse(){
	this.codepage = undefined;
	this.clientId = undefined;
	this.reqField = undefined;
	this.serverId = undefined;
	this.refTime = undefined;
	this.smlVersion = 1;
};

SmlPublicOpenResponse.prototype.getCodepage = function getCodepage(){
	return this.codepage;
};

SmlPublicOpenResponse.prototype.setCodepage = function setCodepage(value){
	this.codepage = value;
};

SmlPublicOpenResponse.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlPublicOpenResponse.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlPublicOpenResponse.prototype.getReqField = function getReqField(){
	return this.reqField;
};

SmlPublicOpenResponse.prototype.setReqField = function setReqField(value){
	this.reqField = value;
};

SmlPublicOpenResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlPublicOpenResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlPublicOpenResponse.prototype.getRefTime = function getRefTime(){
	return this.refTime;
};

SmlPublicOpenResponse.prototype.setRefTime = function setRefTime(value){
	this.refTime = value;
};

SmlPublicOpenResponse.prototype.getSmlVersion = function getSmlVersion(){
	return this.smlVersion;
};

SmlPublicOpenResponse.prototype.setSmlVersion = function setSmlVersion(value){
	this.smlVersion = value;
};

SmlPublicOpenResponse.prototype.write = function write(buffer){
	
};

SmlPublicOpenResponse.prototype.toString = function toString(){
	var str = "\t\tSmlPublicOpenResponse\n";
	str += "\t\t\tCodepage: "+this.codepage+"\n";
	str += "\t\t\tClient-ID: "+this.clientId.toString('hex')+"\n";
	str += "\t\t\tReq-Field: "+this.reqField+"\n";
	str += "\t\t\tServer-ID: "+this.serverId.toString('hex')+"\n";
	if(this.refTime!=undefined){
		str += this.refTime.toString()
	}
	str += "\t\t\tSml-Version: "+this.smlVersion+"\n";
	return str;
};

SmlPublicOpenResponse.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x06){		
		var smlPublicOpenResponse = new SmlPublicOpenResponse();
		
		smlPublicOpenResponse.setCodepage(buffer.readOctetString());	
		smlPublicOpenResponse.setClientId(buffer.readOctetString());	
		smlPublicOpenResponse.setReqField(buffer.readOctetString());	
		smlPublicOpenResponse.setServerId(buffer.readOctetString());
		smlPublicOpenResponse.setRefTime(SmlTime.parse(buffer));		
		smlPublicOpenResponse.setSmlVersion(buffer.readUnsigned());	
		
		return smlPublicOpenResponse;
	} else {
		throw new Error("Unknown TL-Field for SmlPublicOpenResponse!");
	}	
};

module.exports = SmlPublicOpenResponse;
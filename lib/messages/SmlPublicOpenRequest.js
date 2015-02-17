function SmlPublicOpenRequest(){	
	this.codepage = undefined;
	this.clientId = undefined;
	this.reqField = undefined;
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.smlVersion = undefined;
};

SmlPublicOpenRequest.prototype.getCodepage = function getCodepage(){
	return this.codepage;
};

SmlPublicOpenRequest.prototype.setCodepage = function setCodepage(value){
	this.codepage = value;
};

SmlPublicOpenRequest.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlPublicOpenRequest.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlPublicOpenRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlPublicOpenRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlPublicOpenRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlPublicOpenRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlPublicOpenRequest.prototype.getSmlVersion = function getSmlVersion(){
	return this.smlVersion;
};

SmlPublicOpenRequest.prototype.setSmlVersion = function setSmlVersion(value){
	this.smlVersion = value;
};

SmlPublicOpenRequest.prototype.write = function write(buffer){
	
};

SmlPublicOpenRequest.prototype.toString = function toString(){
	var str = "";
	str += "Codepage: "+this.codepage+"\n";
	str += "Client ID: "+this.clientId+"\n";
	str += "Req-Field: "+this.reqField+"\n";
	str += "Server ID: "+this.serverId+"\n";
	str += "Username: "+this.username+"\n";
	str += "Password: "+this.password+"\n";
	str += "SML Version: "+this.smlVersion+"\n";
	return str;
};

SmlPublicOpenRequest.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x07){
		var smlPublicOpenRequest = new SmlPublicOpenRequest();
		smlPublicOpenRequest.setCodepage(buffer.readOctetString());
		smlPublicOpenRequest.setClientId(buffer.readOctetString());
		smlPublicOpenRequest.setReqField(buffer.readOctetString);
		smlPublicOpenRequest.setServerId(buffer.readOctetString());
		smlPublicOpenRequest.setUsername(buffer.readOctetString());
		smlPublicOpenRequest.setPassword(buffer.readOctetString());
		smlPublicOpenRequest.setSmlVersion(buffer.readUnsigned());
		
		return smlPublicOpenRequest;
	} else {
		throw new Error("Unknown TL-Field for SmlPublicOpenRequest!");
	}
};

module.exports = SmlPublicOpenRequest;
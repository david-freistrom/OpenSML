function SmlGetListRequest(){
	this.clientId = undefined;
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.listName = undefined;
};

SmlGetListRequest.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlGetListRequest.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlGetListRequest.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetListRequest.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetListRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlGetListRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlGetListRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlGetListRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlGetListRequest.prototype.getListName = function getListName(){
	return this.listName;
};

SmlGetListRequest.prototype.setListName = function setListName(value){
	this.listName = value;
};

SmlGetListRequest.prototype.write = function write(buffer){
	
};

SmlGetListRequest.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x05){
		var smlGetListRequest = new SmlGetListRequest();
		smlGetListRequest.setClientId(buffer.readOctetString());
		smlGetListRequest.setServerId(buffer.readOctetString());
		smlGetListRequest.setUsername(buffer.readOctetString());
		smlGetListRequest.setPassword(buffer.readOctetString());
		smlGetListRequest.setListName(buffer.readOctetString());
		return smlGetListRequest;
	} else {
		throw new Error("Unknown TL-Field for SmlGetListRequest!");
	}
};

module.exports = SmlGetListRequest;
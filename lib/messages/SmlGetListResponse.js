var SmlTime = require('./data_structures/SmlTime');
var SmlList = require('./data_structures/SmlList');

function SmlGetListResponse(){
	this.clientId = undefined;
	this.serverId = undefined;
	this.listName = undefined;
	this.actSensorTime = undefined;
	this.valList = undefined;
	this.listSignature = undefined;
	this.actGatewayTime = undefined;
};

SmlGetListResponse.prototype.getClientId = function getClientId(){
	return this.clientId;
};

SmlGetListResponse.prototype.setClientId = function setClientId(value){
	this.clientId = value;
};

SmlGetListResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetListResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetListResponse.prototype.getListName = function getListName(){
	return this.listName;
};

SmlGetListResponse.prototype.setListName = function setListName(value){
	this.listName = value;
};

SmlGetListResponse.prototype.getActSensorTime = function getActSensorTime(){
	return this.actSensorTime;
};

SmlGetListResponse.prototype.setActSensorTime = function setActSensorTime(value){
	this.actSensorTime = value;
};

SmlGetListResponse.prototype.getValList = function getValList(){
	return this.valList;
};

SmlGetListResponse.prototype.setValList = function setValList(value){
	this.valList = value;
};

SmlGetListResponse.prototype.getListSignature = function getListSignature(){
	return this.listSignature;
};

SmlGetListResponse.prototype.setListSignature = function setListSignature(value){
	this.listSignature = value;
};

SmlGetListResponse.prototype.getActGatewayTime = function getActGatewayTime (){
	return this.actGatewayTime;
};

SmlGetListResponse.prototype.setActGatewayTime  = function setActGatewayTime (value){
	this.actGatewayTime = value;
};

SmlGetListResponse.prototype.write = function write(buffer){
	
};

SmlGetListResponse.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x07){
		var smlGetListResponse = new SmlGetListResponse();
		smlGetListResponse.setClientId(buffer.readOctetString());
		smlGetListResponse.setServerId(buffer.readOctetString());
		smlGetListResponse.setListName(buffer.readOctetString());
		smlGetListResponse.setActSensorTime(SmlTime.parse(buffer));
		smlGetListResponse.setValList(SmlList.parse(buffer));
		smlGetListResponse.setListSignature(buffer.readOctetString());
		smlGetListResponse.setActGatewayTime(SmlTime.parse(buffer));
		return smlGetListResponse;
	} else {
		throw new Error("Unknown TL-Field for SmlGetListResponse!");
	}
};

module.exports = SmlGetListResponse;
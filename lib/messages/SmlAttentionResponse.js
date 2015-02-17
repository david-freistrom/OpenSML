var SmlTree = require('./data_structures/SmlTree');

function SmlAttentionResponse(){
	this.serverId = undefined;
	this.attentionNo = undefined;
	this.attentionMsg = undefined;
	this.attentionDetails = undefined;
};

SmlAttentionResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlAttentionResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlAttentionResponse.prototype.getAttentionNo = function getAttentionNo(){
	return this.AttentionNo;
};

SmlAttentionResponse.prototype.setAttentionNo = function setAttentionNo(value){
	this.attentionNo = value;
};

SmlAttentionResponse.prototype.getAttentionMsg = function getAttentionMsg(){
	return this.attentionMsg;
};

SmlAttentionResponse.prototype.setAttentionMsg = function setAttentionMsg(value){
	this.attentionMsg = value;
};

SmlAttentionResponse.prototype.getAttentionDetails = function getAttentionDetails(){
	return this.attentionDetails;
};

SmlAttentionResponse.prototype.setAttentionDetails = function setAttentionDetails(value){
	this.attentionDetails = value;
};

SmlAttentionResponse.prototype.write = function write(buffer){
	
};

SmlAttentionResponse.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x04){
		var smlAttentionResponse = new SmlAttentionResponse();
		smlAttentionResponse.setServerId(buffer.readOctetString());
		smlAttentionResponse.setAttentionNo(buffer.readOctetString());
		smlAttentionResponse.setAttentionMsg(buffer.readOctetString());
		smlAttentionResponse.setAttentionDetails(SmlTree.parse(buffer));
		return smlAttentionResponse;
	} else {
		throw new Error("Unknown TL-Field for SmlAttentionResponse!");
	}
};

module.exports = SmlAttentionResponse;
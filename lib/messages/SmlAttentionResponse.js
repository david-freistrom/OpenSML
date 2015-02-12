var SmlBuffer = require('../SmlBuffer');
var Constants = require('../Constants');

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
	
};

module.exports = SmlAttentionResponse;
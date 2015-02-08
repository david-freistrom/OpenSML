var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');

function SmlMessage(){
	this.transactionId = new OctetString();
	this.groupNo = 0x00;
	this.abortOnError = 0x00;
	this.messageBody = new SmlMessageBody();
	this.crc16 = 0x0000;
	this.endOfSmlMsg = new EndOfSmlMsg();
};

SmlMessage.prototype.getTransactionId = function getTransactionId(){
	return this.transactionId;
};

SmlMessage.prototype.setTransactionId = function setTransactionId(value){
	this.transactionId = value;
};

SmlMessage.prototype.getGroupNo = function getGroupNo(){
	return this.groupNo;
};

SmlMessage.prototype.setGroupNo = function setGroupNo(value){
	this.groupNo = value;
};

SmlMessage.prototype.getAbortOnError = function getAbortOnError(){
	return this.abortOnError;
};

SmlMessage.prototype.setAbortOnError = function setAbortOnError(value){
	this.abortOnError = value;
};

SmlMessage.prototype.getMessageBody = function getMessageBody(){
	return this.messageBody;
};

SmlMessage.prototype.setMessageBody = function setMessageBody(value){
	this.messageBody = value;
};

SmlMessage.prototype.getCRC16 = function getCRC16(){
	return this.crc16;
};

SmlMessage.prototype.setCRC16 = function setCRC16(value){
	this.crc16 = value;
};

SmlMessage.prototype.getEndOfSmlMsg = function getEndOfSmlMsg(){
	return this.endOfSmlMsg;
};

SmlMessage.prototype.setEndOfSmlMsg = function setEndOfSmlMsg(value){
	this.endOfSmlMsg = value;
};

module.exports = SmlMessage;
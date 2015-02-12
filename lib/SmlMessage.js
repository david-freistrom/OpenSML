var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');
var SmlMessageBody = require('./SmlMessageBody');

function SmlMessage(){
	this.messageTag = undefined;
	this.transactionId = undefined;
	this.groupNo = 0x00;
	this.abortOnError = 0x00;
	this.messageBody = undefined;
	this.crc16 = 0x0000;
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

SmlMessage.prototype.getMessageTag = function getMessageTag(){
	return this.crc16;
};

SmlMessage.prototype.setMessageTag = function setMessageTag(value){
	this.messageTag = value;
};

SmlMessage.prototype.toString = function toString(){
	var str = "";
	str += "Transaction-ID: "+this.transactionId+"\n";
	str += "Group-No: "+this.groupNo+"\n";
	str += "Abort On Error: "+this.abortOnError+"\n";
	str += this.messageBody.toString();
	str += "CRC 16: "+this.crc16+"\n";
	return str;
};

SmlMessage.prototype.write = function write(buffer){
	buffer.writeOctetString(this.transactionId);
	buffer.writeUInt8(this.groupNo);
	buffer.writeUint8(this.abortOnError);
	this.messageBody.write(buffer);
	buffer.writeUInt16(this.crc16);
	buffer.writeUInt8(0x00);
};

SmlMessage.parse = function parse(buffer){
		
	var smlMessage = new SmlMessage();
	
	if(buffer.readTLField()==0x07,0x06){
		smlMessage.setTransactionId(buffer.readOctetString());	
		smlMessage.setGroupNo(buffer.readUnsigned());	
		smlMessage.setAbortOnError(buffer.readUnsigned());	
		smlMessage.setMessageBody(SmlMessageBody.parse(buffer));			
		smlMessage.setCRC16(buffer.readUnsigned());
	} else {
		throw new Error("Unknown TL-Field for SmlMessage!");
	}
	
	return smlMessage;
};

module.exports = SmlMessage;
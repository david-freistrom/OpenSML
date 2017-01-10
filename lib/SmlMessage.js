/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');
var SmlMessageBody = require('./SmlMessageBody');
var Crc16 = require('crc');

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
	return this.messageTag;
};

SmlMessage.prototype.setMessageTag = function setMessageTag(value){
	this.messageTag = value;
};

SmlMessage.prototype.getSize = function getSize(){
	var size = 10;
	size += this.transactionId.length
	size += this.messageBody.getSize();

	//console.log("Message. size: "+size);
	return size;
};

SmlMessage.prototype.toString = function toString(){
	var str = "\tSTART SmlMessage\n";
	str += "\t\tTransaction-ID: "+this.transactionId+" ("+this.transactionId.toString('hex')+")\n";
	str += "\t\tGroup-No: "+this.groupNo+"\n";
	str += "\t\tAbort On Error: "+this.abortOnError+"\n";
	str += "\t\tMessage-Body: "+this.messageBody.toString();
	str += "\t\tCRC 16: "+this.crc16+"\n";
	str += "\tEND SmlMessage\n";
	return str;
};

SmlMessage.prototype.write = function write(buffer){
	buffer.writeTLField(0x76); // ListOf 0x7z

	buffer.writeOctetString(this.transactionId);
	buffer.writeUnsigned(this.groupNo, Constants.UINT8);
	buffer.writeUnsigned(this.abortOnError, Constants.UINT8)
	this.messageBody.write(buffer);
	buffer.writeUnsigned(this.crc16, Constants.UINT16);
	buffer.writeUInt8(0x00);
};

SmlMessage.parse = function parse(buffer){
	var smlMessage = new SmlMessage();

	if(buffer.readTLField()==0x07,0x06){
        var smlMessageStart = buffer.offset;
        smlMessage.setTransactionId(buffer.readOctetString());
		smlMessage.setGroupNo(buffer.readUnsigned());
		smlMessage.setAbortOnError(buffer.readUnsigned());
		var messageTag = buffer.readChoice();
		smlMessage.setMessageTag(messageTag);

		smlMessage.setMessageBody(SmlMessageBody.parse(buffer, messageTag));

        var checksum = buffer.buffer.slice(smlMessageStart,buffer.offset);
        //console.log("MSG="+checksum.toString('hex'))
        smlMessage.setCRC16(buffer.readUnsigned());
        //console.log("MSG-CRC Msg=" + smlMessage.getCRC16().toString(16));
        //console.log("MSG-CRC Calc=" + Crc16.crc16ccitt(checksum.toString('hex')).toString(16));
	} else {
		throw new Error("Unknown TL-Field for SmlMessage!");
	}

	return smlMessage;
};

module.exports = SmlMessage;

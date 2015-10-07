/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');
var SmlMessage = require('./SmlMessage');
var Crc16 = require('crc');

function SmlFile(){
	this.messages = [];
};

SmlFile.prototype.write = function write(){
	var buffer = new SmlBuffer(new Buffer(this.getSize()));
	buffer.writeUInt32(0x1b1b1b1b);
	buffer.writeUInt32(0x01010101);
	for(msg in this.messages){
		this.messages[msg].write(buffer);
	}
	return buffer;
};

SmlFile.prototype.getSize = function getSize(){
	var size = 8;
	for(msg in this.messages){
		size += this.messages[msg].getSize();
	}
	console.log("SmlFile. size: "+size);
	return size;
}

SmlFile.prototype.addMessage = function addMessage(smlMessage){
	this.messages.push(smlMessage);
}

SmlFile.prototype.getMessages = function getMessages(){
	return this.messages;
}

SmlFile.prototype.toString = function toString(){
	var str = "START SML-File\n";
	
	for(msg in this.messages){
		var message = this.messages[msg];
		str +=  message.toString()+"\n";
	}
	str += "END SML-File\n";
	return str;
}

SmlFile.prototype.parse = function parse(buffer){
	var smlBuffer = new SmlBuffer(buffer);
	
	if(buffer.readUInt32BE(0)==0x1b1b1b1b){
		smlBuffer.setOffset(4);
	}
	
	if(buffer.readUInt32BE(4)==0x01010101){
		smlBuffer.setOffset(8);
	} else if(buffer.readUInt32BE(4)==0x02020202){
		smlBuffer.setOffset(8);
	}

	do{
		var message = SmlMessage.parse(smlBuffer);
		this.addMessage(message);		
		smlBuffer.readUInt8(); // EndOfSMLMessage
		if(message.getMessageTag() == Constants.PUBLIC_CLOSE_RESPONSE || message.getMessageTag() == Constants.PUBLIC_CLOSE_REQUEST){
			var payloadBytes = buffer.length-16;
			var rest = payloadBytes % 4;
			for (var i = 0; i < rest; i++) {
			    if(smlBuffer.readUInt8() != 0x00){
			    	this.valid = false;
			    	break;
			    }
			}
			if(this.valid && buffer.readUInt32BE() == 0x1b1b1b1b){
				smlBuffer.setOffset(smlBuffer.getOffset()+4);
				// check end of file
				if(smlBuffer.readUInt8() != rest || smlBuffer.readUInt8() != 0x1a || this.crc16(buffer.slice(0, -2) != smlBuffer.readUInt16().toString(16))){
					this.valid = false;
				}
			} else {
				this.valid = false;
			}
		}
	}while(smlBuffer.getOffset() < buffer.length);
}

SmlFile.prototype.crc16 = function crc16(buffer){
	return crc.crc16ccitt(buffer.toString(16));
}

module.exports = SmlFile;
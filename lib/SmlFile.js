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
		this.valid = false;
		var message = SmlMessage.parse(smlBuffer);
		this.addMessage(message);
		smlBuffer.readUInt8(); // EndOfSMLMessage
		if(message.getMessageTag() == Constants.PUBLIC_CLOSE_RESPONSE || message.getMessageTag() == Constants.PUBLIC_CLOSE_REQUEST){
			var payloadBytes = buffer[buffer.length-3]
			for (var i = 0; i < payloadBytes ; i++) {
				smlBuffer.readUInt8();
			}
			if(smlBuffer.readUInt32() == 0x1b1b1b1b){
				if(smlBuffer.readUInt8() == 0x1a){
					smlBuffer.setOffset(smlBuffer.getOffset()+1);
					var checksum = buffer.slice(0, -2)
					if(smlBuffer.readUInt16().toString(16) == this.crc16(checksum)){
						this.valid = true;
					}
				}
			}
			console.log('CRC16-Check: '+this.valid);
		}
	}while(smlBuffer.getOffset() < buffer.length);
}

SmlFile.prototype.crc16 = function crc16(buffer){
	console.log(buffer.slice(0, -2).toString('hex'));
	return Crc16.crc16ccitt(buffer.slice(0, -8).toString('hex'));
}

module.exports = SmlFile;
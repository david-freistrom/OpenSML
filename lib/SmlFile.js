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
}

SmlFile.prototype.write = function write(){
	var buffer = new SmlBuffer(new Buffer(this.getSize()));
	buffer.writeUInt32(0x1b1b1b1b);
	buffer.writeUInt32(0x01010101);
    var lastMessageTag=null;
    for(var msg in this.messages){
		this.messages[msg].write(buffer);
        lastMessageTag=this.messages[msg].getMessageTag();
	}
    if(lastMessageTag == Constants.PUBLIC_CLOSE_RESPONSE || lastMessageTag == Constants.PUBLIC_CLOSE_REQUEST){
        do{
            buffer.writeUInt8(0);
        } while (buffer.offset%4!==0);
        buffer.writeUInt32(0x1b1b1b1b);
        buffer.writeUInt8(0x1a);

        //console.log("CALC FOR");
        //console.log(buffer.buffer.slice(0, buffer.offset).toString('hex'));
        var crc=this.crc16(buffer.buffer.slice(0, buffer.offset).toString('hex'));
        //console.log("Calculated write CRC16="+crc.toString(16));
        buffer.writeUInt8(0x03);
        buffer.writeUInt16(crc);
        buffer.finalize();
    }
    else {
        buffer.finalize(8);
    }

	return buffer;
};

SmlFile.prototype.getSize = function getSize(){
	var size = 8;
	for(var msg in this.messages){
		size += this.messages[msg].getSize();
	}
    size += 4-(size%4) + 4 + 1 + 3; // Filler to end up dividable by 4, end sequence (4), end of message (1), checksum (2+1)
    //console.log("SmlFile. size: "+size);
	return size;
};

SmlFile.prototype.addMessage = function addMessage(smlMessage){
	this.messages.push(smlMessage);
};

SmlFile.prototype.getMessages = function getMessages(){
	return this.messages;
};

SmlFile.prototype.toString = function toString(){
	var str = "START SML-File\n";

	for(var msg in this.messages){
		var message = this.messages[msg];
		str +=  message.toString()+"\n";
	}
	str += "END SML-File\n";
	return str;
};

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
			var payloadBytes = buffer[buffer.length-3];
			for (var i = 0; i < payloadBytes ; i++) {
				smlBuffer.readUInt8();
			}
			if(smlBuffer.getOffset() < buffer.length && smlBuffer.readUInt32() == 0x1b1b1b1b){
				if(smlBuffer.readUInt8() == 0x1a){
                    var checksum = buffer.slice(0, smlBuffer.offset);
                    var crc_length=smlBuffer.readUInt8()-1;
                    var crc=smlBuffer.readUInt16().toString(16);
                    //console.log("CRC16-Compare Msg="+crc+", Calculated="+this.crc16(checksum).toString(16));
                    if (crc == this.crc16(checksum).toString(16)){
						this.valid = true;
					}
				}
			}
			//console.log('CRC16-Check: '+this.valid);

		}
	} while(smlBuffer.getOffset() < buffer.length-12);
};

SmlFile.prototype.crc16 = function crc16(buffer){
	//console.log(buffer.toString('hex'));
	return Crc16.crc16ccitt(buffer.toString('hex'));
};

module.exports = SmlFile;

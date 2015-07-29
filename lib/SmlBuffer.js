/**
 * New node file
 */
var Constants = require('./Constants');

function SmlBuffer(value){

	if(value==undefined) {
		this.buffer = new Buffer(Constants.MAX_BUFFER_SIZE);
	} else {	
		this.buffer=value;
	}
	this.offset=0;
};

SmlBuffer.prototype.getBuffer = function getBuffer(){
	return this.buffer;
};

SmlBuffer.prototype.getOffset = function getOffset(){
	return this.offset;
};

SmlBuffer.prototype.setOffset = function setOffset(value){
	this.offset = value;
};

SmlBuffer.prototype.getLength = function getLength(){
	return this.buffer.length;
};

SmlBuffer.prototype.toString = function toString(){
	return this.buffer.toString('hex');	
};

// ########################## OctetString #########################################################

SmlBuffer.prototype.writeOctetString = function writeOctetString(value){
	var bits = Math.ceil(Math.log(value.length)/Math.log(2));
	var bytes = Math.ceil(bits/4);
	var hexLength = (value.length+bytes).toString(16).length % 2 == 0 ? (value.length+bytes).toString(16) : "0"+(value.length+bytes).toString(16);
	var length = new Buffer(hexLength, 'hex');
	
			
	for(var i=0; i<bytes; i++){
		if(bytes-(i+1) > 0){
			byte = 0x80 | ((length.readUInt8(Math.floor(i/2)) & 0xF0)>>4);
		} else {
			byte = 0x00 | (length.readUInt8(Math.floor(i/2)) & 0x0F);	
		}
		this.buffer.writeUInt8(byte, this.offset);
		this.offset+=1;
	}
	
	for(var j=0; j<value.length; j++){
		this.buffer.writeUInt8(value.charCodeAt(j), this.offset);
		this.offset++;
	}
};

SmlBuffer.prototype.readOctetString = function readOctetString(){	
	var tlField = this.readTLField();
	
	if(tlField.type!=0x08 && tlField.type!=0x00){
		throw new Error("Unknown TL-Field 0x"+tlField.type.toString(16)+tlField.length.toString(16)+" for OctetString [Offset: "+this.offset+"]!");
	}
	
	// OPTIONAL
	if(tlField.length==0x01){
		return "";
	}
	
	var result = this.buffer.slice(this.offset, this.offset+tlField.length-1);
	this.offset+=tlField.length-1;
	
	return result;
};

// ############################ read #############################################

SmlBuffer.prototype.readUInt8 = function readUInt8(){
	var result = this.buffer.readUInt8(this.offset);
	this.offset++;
	return result;
};

SmlBuffer.prototype.readInt8 = function readInt8(){
	var result = this.buffer.readInt8(this.offset);
	this.offset++;
	return result;
};

SmlBuffer.prototype.readUInt16 = function readUInt16(){
	var result = this.buffer.readUInt16BE(this.offset);
	this.offset+=2;
	return result;
};

SmlBuffer.prototype.readInt16 = function readInt16(){
	var result = this.buffer.readInt16BE(this.offset);
	this.offset+=2;
	return result;
};

SmlBuffer.prototype.readUInt32 = function readUInt32(){
	var result = this.buffer.readUInt32BE(this.offset);
	this.offset+=4;
	return result;
};

SmlBuffer.prototype.readInt32 = function readInt32(){
	var result = this.buffer.readInt32BE(this.offset);
	this.offset+=4;
	return result;
};

SmlBuffer.prototype.readUInt64 = function readUInt64(){
	//var result = (this.buffer.readUInt32BE(this.offset+4)<<8) & this.buffer.readUIntBE(this.offset);
	var result = this.buffer.readDoubleBE(this.offset);
	this.offset+=8;
	return result;
};

SmlBuffer.prototype.readInt64 = function readInt64(){
	var Int64 = require('node-int64');
	var int64 = new Int64(this.buffer, this.offset);
	this.offset+=8;
	return int64.toNumber(true);
};


// ################################ write ########################################

SmlBuffer.prototype.writeInt8 = function writeInt8(value){
	this.buffer.writeInt8(value, this.offset);
	this.offset+=1;
};

SmlBuffer.prototype.writeUInt8 = function writeUInt8(value){
	this.buffer.writeUInt8(value, this.offset);
	this.offset+=1;
};

SmlBuffer.prototype.writeInt16 = function writeInt16(value){
	this.buffer.writeInt16BE(value, this.offset);
	this.offset+=2;
};

SmlBuffer.prototype.writeUInt16 = function writeUInt16(value){
	this.buffer.writeUInt16BE(value, this.offset);
	this.offset+=2;
};

SmlBuffer.prototype.writeInt32 = function writeInt32(value){
	this.buffer.writeInt32BE(value, this.offset);
	this.offset+=4;
};

SmlBuffer.prototype.writeUInt32 = function writeUInt32(value){
	this.buffer.writeUInt32BE(value, this.offset);
	this.offset+=4;
};

SmlBuffer.prototype.writeInt64 = function writeInt64(value){
	this.buffer.writeDoubleBE(value, this.offset);
	this.offset+=8;
};

SmlBuffer.prototype.writeUInt64 = function writeUInt64(value){
	this.buffer.writeDoubleBE(value, this.offset);
	this.offset+=8;
};

// #########################################################################

SmlBuffer.prototype.readTLField = function readTLField(){
	var length = 0;
	var counter=-1;
	do {
		counter++;
		var tlField = this.buffer.readUInt8(this.offset);
		this.offset++;
		var type = (tlField >> 4);
		length = ((length<<4) + (tlField & 0x0F));
	} while (type>=0x08);
	
	length-=counter;
	
	return {type: type, length: length};
};

// ToDo: Multibyte tl fields
SmlBuffer.prototype.writeTLField = function writeTLField(value){
	this.buffer.writeUInt8(value, this.offset);
	this.offset++;
}


SmlBuffer.prototype.readUnsigned = function readUnsigned(){
	var tlField = this.readTLField();
	var type = tlField.type;
	var length = tlField.length;
	
	
	
	if(type!=Constants.UNSIGNED && type!=0x00){
		throw new Error("Wrong TL-Field for Unsigned!");
	} else {
		// Optional
		if(type==0x00){
			return "";
		} else {
			if(length == 0x02){
				return this.readUInt8();
			} else if(length == 0x03){
				return this.readUInt16();
			} else if(length == 0x05){
				return this.readUInt32();
			} else if(length == 0x09){
				return this.readUInt64();
			}
		}
	}		
};

SmlBuffer.prototype.writeUnsigned = function writeUnsigned(value, tlField){
	if(tlField==Constants.UINT8){
		this.writeTLField(Constants.UINT8);
		this.writeUInt8(value);
	} else if(tlField==Constants.UINT16){
		this.writeTLField(Constants.UINT16);
		this.writeUInt16(value);
	} else if(tlField==Constants.UINT32){
		this.writeTLField(Constants.UINT32);
		this.writeUInt32(value);
	} else if(tlField==Constants.UINT64){
		this.writeTLField(Constants.UINT64);
		this.writeUInt64(value);
	} 
};

SmlBuffer.prototype.readInteger = function readInteger(){
	var tlField = this.readTLField();
	var type = tlField.type;
	var length = tlField.length;
	
	if(type!=Constants.INTEGER && type!=0x00){
		throw new Error("Wrong TL-Field for Integer!");
	} else {
		// Optional
		if(type==0x00){
			return "";
		} else {
			if(length == 0x02){
				return this.readInt8();
			} else if(length == 0x03){
				return this.readInt16();
			} else if(length == 0x05){
				return this.readInt32();
			} else if(length == 0x09){
				return this.readInt64();
			}
		}
	}
};

SmlBuffer.prototype.writeInteger = function writeInteger(value, tlField){
	if(tlField==Constants.INT8){
		this.writeTLField(Constants.INT8);
		this.writeInt8(value);
	} else if(tlField==Constants.INT16){
		this.writeTLField(Constants.INT16);
		this.writeInt16(value);
	} else if(tlField==Constants.INT32){
		this.writeTLField(Constants.INT32);
		this.writeInt32(value);
	} else if(tlField==Constants.INT64){
		this.writeTLField(Constants.INT64);
		this.writeInt64(value);
	}
};

SmlBuffer.prototype.readSmlValue = function readSmlValue(){	
	
	if((this.buffer.readUInt8(this.offset)>>4)==0x00 || (this.buffer.readUInt8(this.offset)>>4)==0x08){
		return this.readOctetString();
	} else if((this.buffer.readUInt8(this.offset)>>4)==0x04){
		return this.readSmlBoolean();
	} else if((this.buffer.readUInt8(this.offset)>>4)==0x05){
		return this.readInteger();
	} else if((this.buffer.readUInt8(this.offset)>>4)==0x06){
		return this.readUnsigned();
	} else {
		throw new Error("Wrong TL-Field 0x"+this.buffer.readUInt8(this.offset).toString(16)+" for SmlValue!");
	}
};

SmlBuffer.prototype.writeSmlValue = function writeSmlValue(value, valueType){	
	if(valueType==Constants.BOOLEAN){
		this.writeSmlBoolean(value);
	} else if(valueType==Constants.OCTET_STRING){
		this.writeOctetString(value);
	} else if(valueType==Constants.UINT8){
		this.writeUnsigned(value, valueType);
	} else if(valueType==Constants.UINT16){
		this.writeUnsigned(value, valueType);
	} else if(valueType==Constants.UINT32){
		this.writeUnsigned(value, valueType);
	} else if(valueType==Constants.UINT64){
		this.writeUnsigned(value, valueType);
	} else if(valueType==Constants.INT8){
		this.writeInteger(value, valueType);
	} else if(valueType==Constants.INT16){
		this.writeInteger(value, valueType);
	} else if(valueType==Constants.INT32){
		this.writeInteger(value, valueType);
	} else if(valueType==Constants.INT64){
		this.writeInteger(value, valueType);
	}
};

SmlBuffer.prototype.readSmlBoolean = function readSmlBoolean(){
	var tlField = this.readTLField();
	var type = tlField.type;
	var length = tlField.length;
	
	if(type == 0x00 && length == 0x01){
		// OPTIONAL
		return undefined;
	} else {
		if(type != Constants.BOOLEAN || length != 0x02){
			throw new Error("Wrong TL-Field for Boolean!");
		} else {
			if(this.readUInt8()==0x00){
				return false;
			} else {
				return true;
			}
		}
	}
};

SmlBuffer.prototype.writeSmlBoolean = function writeSmlBoolean(value){
	
	if(value == undefined){
		// Optional
		this.writeUInt8(0x01);
	} else {
		this.writeTLField(0x42);
		if(value == true){
			this.writeUInt8(0x01);
		} else {
			this.writeUInt8(0x00);
		}
	}
};

SmlBuffer.prototype.readChoice = function readChoice(){
	return this.readUnsigned();
};

SmlBuffer.prototype.writeChoice = function writeChoice(value, tlField){
	this.buffer.writeUInt8(0x72, this.offset);
	this.offset++;
	this.writeUInt8(tlField);
	if(tlField==Constants.UINT8){
		this.writeUInt8(value);
	} else if(tlField==Constants.UINT16){
		// EMMetering verwendet nur 16 bit für die codierung anstelle von 32 wie in der sml spezifikation vorgesehen
		this.writeUInt16(value);
	} else if(tlField==Constants.UINT32){
		this.writeUInt32(value);
	}
};

module.exports = SmlBuffer;
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

SmlBuffer.prototype.writeOctetString = function writeOctetString(value){
	var bits = Math.ceil(Math.LN2(value.length));
	for(var i=0; i<bits; i++){
		if(i+1 < bytes)
		this.buffer.writeUInt8(0x1000);
	}
	var tlField = 0x0000
};

SmlBuffer.prototype.readOctetString = function readOctetString(){	
	var string="";
	var tlField = this.readTLField();
	
	// OPTIONAL
	if(tlField.type==0x01){
		return "";
	}
	
	if(tlField.type!=0x08 && tlField.type!=0x00){
		throw new Error("Unknown TL-Field for OctetString!");
	}

	//for(var i=0; i<tlField.length-1; i++){
	//	string+=this.buffer.slice(this.offset, this.offset)toString('hex', this.offset,this.offset+1);	
	//	this.offset++;
    //}
	var result = this.buffer.slice(this.offset, this.offset+tlField.length-1);
	this.offset+=tlField.length-1;
	return result;
};

SmlBuffer.prototype.readUInt8 = function readUInt8(){
		
	var tlField = this.readTLField();	
		
	// OPTIONAL
	if(tlField.type==0x00 && tlField.length==0x01){
		return "";
	}
	
	if(tlField.type!=0x06 && tlField.length!=0x02){
		throw new Error("Unknown TL-Field for UInt8!");
	}
	
	var result = this.buffer[this.offset];
	this.offset++;
	return result;
};

SmlBuffer.prototype.readUInt16 = function readUInt16(){
	var tlField = this.readTLField();	
		
	// OPTIONAL
	if(tlField.type==0x00 && tlField.length==0x01){
		return "";
	}
	
	if(tlField.type!=0x06 && tlField.length!=0x03){
		throw new Error("Unknown TL-Field for UInt16!");
	}
	
	var result = this.buffer.readUInt16BE(this.offset);
	this.offset+=2;
	return result;
};

SmlBuffer.prototype.readUInt32 = function readUInt32(){
	
	var tlField = this.readTLField();	
	
	// OPTIONAL
	if(tlField.type==0x00 && tlField.length==0x01){
		return "";
	}
				
	if(tlField.type!=0x06 && tlField.length!=0x05){
		throw new Error("Unknown TL-Field for UInt32!");
	}
	
	var result = this.buffer.readUInt32BE(this.offset);
	this.offset+=4;
	return result;
};

SmlBuffer.prototype.readUInt64 = function readUInt64(){
	
	var tlField = this.readTLField();	
	
	// OPTIONAL
	if(tlField.type==0x00 && tlField.length==0x01){
		return "";
	}
				
	if(tlField.type!=0x06 && tlField.length!=0x09){
		throw new Error("Unknown TL-Field for UInt64!");
	}
	
	var result = (this.buffer.readUInt32BE(this.offset+4)<<8) + this.buffer.readUIntBELE(this.offset);
	this.offset+=8;
	return result;
};

SmlBuffer.prototype.writeUInt8 = function writeUInt8(value){
	this.buffer.writeUInt8(value, this.offset);
	this.offset+=1;
}

SmlBuffer.prototype.writeUInt16 = function writeUInt16(value){
	this.buffer.writeUInt16LE(value, this.offset);
	this.offset+=2;
};

SmlBuffer.prototype.writeUInt32 = function writeUInt32(value){
	this.buffer.writeUInt32LE(value, this.offset);
	this.offset+=4;
};

SmlBuffer.prototype.writeUInt64 = function writeUInt64(value){
	this.buffer.writeDoubleLE(value, this.offset);
	this.offset+=8;
};

SmlBuffer.prototype.readTLField = function readTLField(){
	var length = 0;
	do {
		var tlField = this.buffer.readUInt8(this.offset);
		this.offset++;
		var type = (tlField >> 4);
		length = ((length<<4) + (tlField & 0x0F));
	} while (type>=0x08);
	
	return {type: type, length: length};
};

module.exports = SmlBuffer;
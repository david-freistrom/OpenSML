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
	var result = (this.buffer.readUInt32BE(this.offset+4)<<8) + this.buffer.readUIntBELE(this.offset);
	this.offset+=8;
	return result;
};

SmlBuffer.prototype.readInt64 = function readInt64(){
	var Int64 = require('node-int64');
	var int64 = new Int64(this.buffer, this.offset);
	this.offset+=8;
	return int64.toNumber(true);
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


SmlBuffer.prototype.readUnsigned = function readUnsigned(){
	var tlField = this.readTLField();

	if(tlField.type!=Constants.UNSIGNED && tlField.type!=0x00){
		throw new Error("Wrong TL-Field for Unsigned!");
	}
	
	// Not Set
	if(tlField.type==0x00){
		return "";
	}
		
	var int = 0;
	for(var i=0; i<tlField.length-1; i++){
		int = ((int<<8)+this.buffer.readUInt8(this.offset));
		this.offset++;
	}
		
	return int;
}

SmlBuffer.prototype.writeUnsigned = function writeUnsigned(value){
	
}

SmlBuffer.prototype.readInteger = function readInteger(){
	var tlField = this.readTLField();
	
	if(tlField.type!=Constants.INTEGER && tlField.type!=0x00){
		throw new Error("Wrong TL-Field for Integer!");
	}
	
	// Not Set
	if(tlField.type==0x00){
		return "";
	}
	
	var int = 0;
	if(tlField.length-1==1){
		int = this.readInt8();
	} else if(tlField.length-1==2){
		int = this.readInt16();
	} else if(tlField.length-1==4){
		int = this.readInt32();
	} else if(tlField.length-1==8){
		int = this.readInt64();
	}
	
	//var int = 0;
//	for(var i=0; i<tlField.length-1; i++){
//		int = ((int<<8) + this.buffer.readUInt8(this.offset));
//		this.offset++;
//	}
//	
//	if((int >> tlField.length-2*8)==1){
//		int 
//	}
	
	return int;
}

SmlBuffer.prototype.writeInteger = function writeInteger(value){
	
}

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
		throw new Error("Wrong TL-Field "+this.buffer.readUInt8(this.offset).toString(16)+" for SmlValue!");
	}
}

SmlBuffer.prototype.readSmlBoolean = function readSmlBoolean(){
	var tlField = this.readTLField();
	if(tlField.type!=0x42){
		throw new Error("Wrong TL-Field for Boolean");
	}
		
	if(this.readUInt8()==0x00){
		return false;
	} else {
		return true;
	}
}

SmlBuffer.prototype.readChoice = function readChoice(){
	return this.readUnsigned();
}

SmlBuffer.prototype.writeSmlBoolean = function writeSmlBoolean(){
	
}


module.exports = SmlBuffer;
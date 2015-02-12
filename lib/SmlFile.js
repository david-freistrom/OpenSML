var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');
var SmlMessage = require('./SmlMessage');

function SmlFile(){
	this.type = undefined;
	this.status = 0x00;
	this.version = undefined;
	this.messages = [];
};

SmlFile.prototype.write = function write(buffer){
	buffer.writeUInt16(0x1b1b1b1b);
	buffer.writeUInt16(version);
	for(msg in this.messages){
		this.messages[msg].write(buffer);
	}
	// add end sequence depend on size
	return buffer;
};

SmlFile.prototype.getStatus = function getStatus(){
	return this.status;
}

SmlFile.prototype.setStatus = function setStatus(value){
	this.status = value;
}

SmlFile.prototype.getVersion = function getVersion(){
	return this.version;
}

SmlFile.prototype.setVersion = function setVersion(value){
	this.version = value;
}

SmlFile.prototype.getType = function getType(){
	return this.type;
}

SmlFile.prototype.setType = function setType(value){
	this.type = value;
}

SmlFile.prototype.getMessages = function getMessages(){
	return this.messages;
}

SmlFile.prototype.toString = function toString(){
	var str = "";
	str += "File-Type: "+this.type+"\n";
	str += "File-Status: "+this.status+"\n";
	str += "Version: "+this.version+"\n";
		
	for(msg in this.messages){
		var message = this.messages[msg];
		str +=  message.toString();
	}
	return str;
}

SmlFile.prototype.parse = function parse(buffer){
	var smlBuffer = new SmlBuffer(buffer);
	
	if(buffer.readUInt32BE(0)==0x1b1b1b1b){
		this.status=0x01
		this.type="SML";
		smlBuffer.setOffset(4);
	}
	
	if(buffer.readUInt32BE(4)==0x01010101){
		this.version=1;
		smlBuffer.setOffset(8);
	}
	
	if(buffer.readUInt32BE(4)==0x02020202){
		this.version=2;
		smlBuffer.setOffset(8);
	}
	
	var message = SmlMessage.parse(smlBuffer);
	this.messages[this.messages.length] = message;
	
	if(message.getMessageTag()==Constants.CLOSE_REQUEST || message.getMessageTag()==Constants.CLOSE_RESPONSE){
		this.status=0x00;
	}
}

module.exports = SmlFile;

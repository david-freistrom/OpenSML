var SmlBuffer = require('./SmlBuffer');
var Constants = require('./Constants');
var SmlMessage = require('./SmlMessage');

function SmlFile(){
	this.type = undefined;
	this.status = 0x00;
	this.version = 0x01;
	this.messages = [];
};

SmlFile.prototype.write = function write(){
	var buffer = new SmlBuffer(new Buffer(this.getSize()));
	buffer.writeUInt32(0x1b1b1b1b);
	buffer.writeUInt32(0x01010101);
	for(msg in this.messages){
		this.messages[msg].write(buffer);
	}
	// add end sequence depend on size
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

SmlFile.prototype.addMessage = function addMessage(smlMessage){
	this.messages.push(smlMessage);
}

SmlFile.prototype.getMessages = function getMessages(){
	return this.messages;
}

SmlFile.prototype.toString = function toString(){
	var str = "START SML-File\n";
	str += "\tFile-Type: "+this.type+"\n";
	str += "\tFile-Status: "+this.status+"\n";
	str += "\tVersion: "+this.version+"\n";
	
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

	do{
		var message = SmlMessage.parse(smlBuffer);
		this.addMessage(message);		
		
		if(message.getMessageTag()==Constants.PUBLIC_CLOSE_REQUEST || message.getMessageTag()==Constants.PUBLIC_CLOSE_RESPONSE){
			this.status=0x00;
		}
	}while(smlBuffer.getOffset()<smlBuffer.getLength());
	
	
}

module.exports = SmlFile;
function SmlTime(){
	this.secIndex = undefined;
	this.timestamp = undefined;
};

SmlTime.prototype.getSecIndex = function getSecIndex(){
	return this.secIndex;
};

SmlTime.prototype.setSecIndex = function setSecIndex(value){
	this.secIndex = value;
};

SmlTime.prototype.getTimestamp = function getTimestamp(){
	return this.timestamp;
};

SmlTime.prototype.setTimestamp = function setTimestamp(value){
	this.timestamp = value;
};

SmlTime.prototype.toString = function toString(){
	var str = "";
	if(this.secIndex !=undefined){
		str += "Sec-Index: "+this.secIndex+"\n";
	} else if(this.timestamp !=undefined){
		str += "Timestamp: "+this.timestamp+"\n";
	} else {
		str += "";
	} 
	return str;
}

SmlTime.prototype.write = function write(buffer){
	
};

SmlTime.parse = function parse(buffer){
	var tlField = buffer.readTLField();	
	var smlTime = new SmlTime();
	
	// OPTIONAL
	if(tlField.type==0x00 && tlField.length==0x01){
		return undefined;
	}

	var choice = buffer.readUnsigned();	
		
	if(choice==0x01){
		smlTime.secIndex = buffer.readUnsigned();
	} else if(choice==0x02){
		smlTime.timestamp = buffer.readUnsigned();
	}
	
	return smlTime;
	
};

module.exports = SmlTime;
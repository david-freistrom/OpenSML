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

SmlTime.prototype.write = function write(buffer){
	
};

SmlTime.parse = function parse(buffer){
	
};

module.exports = SmlTime;
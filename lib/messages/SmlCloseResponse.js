function SmlCloseResponse(){
	this.globalSignature = new OctetString();
};

SmlCloseResponse.prototype.getGlobalSignature = function getGlobalSignature(){
	return this.globalSignature;
};

SmlCloseResponse.prototype.setGlobalSignature = function setGlobalSignature(value){
	this.globalSignature = value;
};

SmlCloseResponse.prototype.write = function write(buffer){
	
};

SmlCloseResponse.parse = function parse(buffer){
	
};

module.exports = SmlCloseResponse;
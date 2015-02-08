function SmlCloseRequest(){
	this.globalSignature = new OctetString();
};

SmlCloseRequest.prototype.getGlobalSignature = function getGlobalSignature(){
	return this.globalSignature;
};

SmlCloseRequest.prototype.setGlobalSignature = function setGlobalSignature(value){
	this.globalSignature = value;
};

SmlCloseRequest.prototype.write = function write(buffer){
	
};

SmlCloseRequest.parse = function parse(buffer){
	
};

module.exports = SmlCloseRequest;
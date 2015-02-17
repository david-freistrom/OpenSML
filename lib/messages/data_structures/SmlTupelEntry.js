function SmlTupelEntry(){
	this.serverId = undefined;
	this.secIndex = undefined;
	this.status = undefined;
	this.unitPa = undefined;
	this.scalerPa = undefined;
	this.valuePa = undefined;
	this.unitR1 = undefined;
	this.scalerR1 = undefined;
	this.valueR1 = undefined;
	this.unitR4 = undefined;
	this.scalerR4 = undefined;
	this.valueR4 = undefined;
	this.signature_pA_R1_R4 = undefined;
	this.unitMa = undefined;
	this.scalerMa = undefined;
	this.valueMa = undefined;
	this.unitR2 = undefined;
	this.scalerR2 = undefined;
	this.valueR2 = undefined;
	this.unitR3 = undefined;
	this.scalerR3 = undefined;
	this.valueR3 = undefined;
	this.signature_mA_R2_R3 = undefined;
};

SmlTupelEntry.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlTupelEntry.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlTupelEntry.prototype.getSecIndex = function getSecIndex(){
	return this.secIndex;
};

SmlTupelEntry.prototype.setSecIndex = function setSecIndex(value){
	this.secIndex = value;
};

SmlTupelEntry.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlTupelEntry.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlTupelEntry.prototype.getUnitPa = function getUnitPa(){
	return this.unitPa;
};

SmlTupelEntry.prototype.setUnitPa = function setUnitPa(value){
	this.unitPa = value;
};

SmlTupelEntry.prototype.getScalerPa = function getScalerPa(){
	return this.scalerPa;
};

SmlTupelEntry.prototype.setScalerPa = function setScalerPa(value){
	this.scalerPa = value;
};

SmlTupelEntry.prototype.getValuePa = function getValuePa(){
	return this.valuePa;
};

SmlTupelEntry.prototype.setValuePa = function setValuePa(value){
	this.valuePa = value;
};

SmlTupelEntry.prototype.getUnitR1 = function getUnitR1(){
	return this.unitR1;
};

SmlTupelEntry.prototype.setUnitR1 = function setUnitR1(value){
	this.unitR1 = value;
};

SmlTupelEntry.prototype.getScalerR1 = function getScalerR1(){
	return this.scalerR1;
};

SmlTupelEntry.prototype.setScalerR1 = function setScalerR1(value){
	this.scalerR1 = value;
};

SmlTupelEntry.prototype.getValueR1 = function getValueR1(){
	return this.valueR1;
};

SmlTupelEntry.prototype.setValueR1 = function setValueR1(value){
	this.valueR1 = value;
};

SmlTupelEntry.prototype.getUnitR4 = function getUnitR4(){
	return this.unitR4;
};

SmlTupelEntry.prototype.setUnitR4 = function setUnitR4(value){
	this.unitR4 = value;
};

SmlTupelEntry.prototype.getScalerR4 = function getScalerR4(){
	return this.scalerR4;
};

SmlTupelEntry.prototype.setScalerR4 = function setScalerR4(value){
	this.scalerR4 = value;
};

SmlTupelEntry.prototype.getValueR4 = function getValueR4(){
	return this.valueR4;
};

SmlTupelEntry.prototype.setValueR4 = function setValueR4(value){
	this.valueR4 = value;
};

SmlTupelEntry.prototype.getSignature_pA_R1_R4 = function getSignature_pA_R1_R4(){
	return this.signature_pA_R1_R4;
};

SmlTupelEntry.prototype.setSignature_pA_R1_R4 = function setSignature_pA_R1_R4(value){
	this.signature_pA_R1_R4 = value;
};

SmlTupelEntry.prototype.getUnitMa = function getUnitMa(){
	return this.unitMa;
};

SmlTupelEntry.prototype.setUnitMa = function setUnitMa(value){
	this.unitMa = value;
};

SmlTupelEntry.prototype.getScalerMa = function getScalerMa(){
	return this.scalerMa;
};

SmlTupelEntry.prototype.setScalerMa = function setScalerMa(value){
	this.scalerMa = value;
};

SmlTupelEntry.prototype.getValueMa = function getValueMa(){
	return this.valueMa;
};

SmlTupelEntry.prototype.setValueMa = function setValueMa(value){
	this.valueMa = value;
};

SmlTupelEntry.prototype.getUnitR2 = function getUnitR2(){
	return this.unitR2;
};

SmlTupelEntry.prototype.setUnitR2 = function setUnitR2(value){
	this.unitR2 = value;
};

SmlTupelEntry.prototype.getScalerR2 = function getScalerR2(){
	return this.scalerR2;
};

SmlTupelEntry.prototype.setScalerR2 = function setScalerR2(value){
	this.scalerR2 = value;
};

SmlTupelEntry.prototype.getValueR2 = function getValueR2(){
	return this.valueR2;
};

SmlTupelEntry.prototype.setValueR2 = function setValueR2(value){
	this.valueR2 = value;
};

SmlTupelEntry.prototype.getUnitR3 = function getUnitR3(){
	return this.unitR3;
};

SmlTupelEntry.prototype.setUnitR3 = function setUnitR3(value){
	this.unitR3 = value;
};

SmlTupelEntry.prototype.getScalerR3 = function getScalerR3(){
	return this.scalerR3;
};

SmlTupelEntry.prototype.setScalerR3 = function setScalerR3(value){
	this.scalerR3 = value;
};

SmlTupelEntry.prototype.getValueR3 = function getValueR3(){
	return this.valueR3;
};

SmlTupelEntry.prototype.setValueR3 = function setValueR3(value){
	this.valueR3 = value;
};

SmlTupelEntry.prototype.getSignature_mA_R2_R3 = function getSignature_mA_R2_R3(){
	return this.signature_mA_R2_R3;
};

SmlTupelEntry.prototype.setSignature_mA_R2_R3 = function setSignature_mA_R2_R3(value){
	this.signature_mA_R2_R3 = value;
};

SmlTupelEntry.prototype.write = function write(buffer){
	
};

SmlTupelEntry.prototype.toString = function toString(){
	var str = "";

	return str;
};

SmlTupelEntry.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x17){
		var smlTupelEntry = new SmlTupelEntry();
		smlTupelEntry.setServerId(buffer.readOctetString());
		smlTupelEntry.setSecIndex(SmlTime.parse(buffer));
		smlTupelEntry.setStatus(buffer.readUnsigned());
		smlTupelEntry.setUnitPa(buffer.readUnsigned());
		smlTupelEntry.setScalerPa(buffer.readInteger());
		smlTupelEntry.setValuePa(buffer.readInteger());
		smlTupelEntry.setUnitR1(buffer.readUnsigned());
		smlTupelEntry.setScalerR1(buffer.readInteger());
		smlTupelEntry.setValueR1(buffer.readInteger());
		smlTupelEntry.setUnitR4(buffer.readUnsigned());
		smlTupelEntry.setScalerR4(buffer.readInteger());
		smlTupelEntry.setValueR4(buffer.readInteger());
		smlTupelEntry.setSignature_pA_R1_R4(buffer.readOctetString())
		smlTupelEntry.setUnitMa(buffer.readUnsigned());
		smlTupelEntry.setScalerMa(buffer.readInteger());
		smlTupelEntry.setValueMa(buffer.readInteger());
		smlTupelEntry.setUnitR2(buffer.readUnsigned());
		smlTupelEntry.setScalerR2(buffer.readInteger());
		smlTupelEntry.setValueR2(buffer.readInteger());
		smlTupelEntry.setUnitR3(buffer.readUnsigned());
		smlTupelEntry.setScalerR3(buffer.readInteger());
		smlTupelEntry.setValueR3(buffer.readInteger());
		smlTupelEntry.setSignature_mA_R2_R3(buffer.readOctetString())
		
		return smlTupelEntry;
	} else {
		throw new Error("Unknown TL-Field for SmlTupelEntry!");
	}
};

module.exports = SmlTupelEntry;
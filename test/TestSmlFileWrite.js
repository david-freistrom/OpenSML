// Test for writing a SML-File
var sml = require('../index');

var smlFile = new sml.SmlFile();
//smlFile.setType("SML");
//smlFile.setStatus(0x01);
//smlFile.setVersion(1);

var smlMessage1 = new sml.SmlMessage();
smlMessage1.setMessageTag(sml.Constants.PUBLIC_OPEN_RESPONSE);
smlMessage1.setTransactionId("01234567890abc");
smlMessage1.setGroupNo(0);
smlMessage1.setAbortOnError(0);
smlMessage1.setCRC16(0xFFFF);

// EndOfSmlMsg
//var endOfSmlMsg = new EndOfSmlMsg();
//smlMessage1.setEndOfSmlMsg(endOfSmlMsg);

// Message Body
var smlPublicOpenResponse = new sml.SmlPublicOpenResponse();
//smlPublicOpenResponse.setCodepage("ISO9660");
smlPublicOpenResponse.setClientId("0500153b022e39");
smlPublicOpenResponse.setReqFileId("510158881");
smlPublicOpenResponse.setServerId("1ba5590af1a");

smlTime = new sml.SmlTime();
smlTime.setTimestamp(4294967295);
smlPublicOpenResponse.setRefTime(smlTime);
//smlPublicOpenResponse.setSmlVersion();
smlMessage1.setMessageBody(smlPublicOpenResponse);



smlFile.addMessage(smlMessage1);

	var smlMessage2 = new sml.SmlMessage();
	smlMessage2.setTransactionId("510158883");
	smlMessage2.setMessageTag(sml.Constants.GET_PROFILE_LIST_RESPONSE);
	var smlGetProfileListResponse = new sml.SmlGetProfileListResponse();
	smlGetProfileListResponse.setServerId("1ba5590af1aa");
	var actTime = new sml.SmlTime();
	actTime.setTimestamp(4294967295);
	smlGetProfileListResponse.setActTime(actTime);
	smlGetProfileListResponse.setRegPeriod(0);
	var parameterTreePath = new sml.SmlTreePath();
	parameterTreePath.addPathEntry("rgrdgdfgf");
	smlGetProfileListResponse.setParameterTreePath(parameterTreePath);
	var valTime = new sml.SmlTime();
	valTime.setSecIndex(4294967295);
	smlGetProfileListResponse.setValTime(valTime);
	smlGetProfileListResponse.setStatus(386);
	var periodList = new sml.SmlPeriodList();

	var periodListEntry = new sml.SmlPeriodListEntry();
	periodListEntry.setObjName("0100010800ff");
	periodListEntry.setUnit(30);
	periodListEntry.setScaler(-1);
	periodListEntry.setValue(1252);
	periodListEntry.setValueType(sml.Constants.INT16);
	//periodListEntry.setValueSignature();
	periodList.addPeriodListEntry(periodListEntry);

	var periodListEntry = new sml.SmlPeriodListEntry();
	periodListEntry.setObjName("0100010801ff");
	periodListEntry.setUnit(30);
	periodListEntry.setScaler(-1);
	periodListEntry.setValue(1252);
	periodListEntry.setValueType(sml.Constants.INT16);
	//periodListEntry.setValueSignature();
	periodList.addPeriodListEntry(periodListEntry);

	var periodListEntry = new sml.SmlPeriodListEntry();
	periodListEntry.setObjName("0100100700ff");
	periodListEntry.setUnit(30);
	periodListEntry.setScaler(-1);
	periodListEntry.setValue(523);
	periodListEntry.setValueType(sml.Constants.INT16);
	//periodListEntry.setValueSignature();
	periodList.addPeriodListEntry(periodListEntry);

	var periodListEntry = new sml.SmlPeriodListEntry();
	periodListEntry.setObjName("0100010802ff");
	periodListEntry.setUnit(30);
	periodListEntry.setScaler(-1);
	periodListEntry.setValue(986);
	periodListEntry.setValueType(sml.Constants.INT16);
	//periodListEntry.setValueSignature();
	periodList.addPeriodListEntry(periodListEntry);

	smlGetProfileListResponse.setPeriodList(periodList);
	//smlGetProfileListResponse.setRawdata();
	//smlGetProfileListResponse.setPeriodSignature();
	smlMessage2.setMessageBody(smlGetProfileListResponse);
	smlFile.addMessage(smlMessage2);

	var smlMessage3 = new sml.SmlMessage();
	smlMessage3.setTransactionId("510158884");
	smlMessage3.setMessageTag(sml.Constants.PUBLIC_CLOSE_RESPONSE);
	var smlPublicCloseResponse = new sml.SmlPublicCloseResponse();
	//smlPublicCloseResponse.setGlobalSignature();
	smlMessage3.setMessageBody(smlPublicCloseResponse);
	smlFile.addMessage(smlMessage3);
	var buffer = smlFile.write()

	console.log(smlFile.toString());

	console.log(buffer.toString(16));

/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

var Constants = require('./Constants');

var SmlAttentionResponse = require('./messages/SmlAttentionResponse');
var SmlPublicCloseRequest = require('./messages/SmlPublicCloseRequest');
var SmlPublicCloseResponse = require('./messages/SmlPublicCloseResponse');
var SmlGetListRequest = require('./messages/SmlGetListRequest');
var SmlGetListResponse = require('./messages/SmlGetListResponse');
var SmlGetProcParameterRequest = require('./messages/SmlGetProcParameterRequest');
var SmlGetProcParameterResponse = require('./messages/SmlGetProcParameterResponse');
var SmlGetProfileListRequest = require('./messages/SmlGetProfileListRequest');
var SmlGetProfileListResponse = require('./messages/SmlGetProfileListResponse');
var SmlGetProfilePackRequest = require('./messages/SmlGetProfilePackRequest');
var SmlGetProfilePackResponse = require('./messages/SmlGetProfilePackResponse');
var SmlPublicOpenRequest = require('./messages/SmlPublicOpenRequest');
var SmlPublicOpenResponse = require('./messages/SmlPublicOpenResponse');
var SmlSetProcParameterRequest = require('./messages/SmlSetProcParameterRequest');
var SmlSetProcParameterResponse = require('./messages/SmlSetProcParameterResponse');

function SmlMessageBody(messageTag){
	
	switch(messageTag) {
		case Constants.PUBLIC_OPEN_REQUEST:
			return new SmlPublicOpenRequest();
			break;
			
		case Constants.PUBLIC_OPEN_RESPONSE:
			return new SmlPublicOpenResponse();
			break;
			
		case Constants.PUBLIC_CLOSE_REQUEST:
			return new SmlPublicCloseRequest();
			break;
			
		case Constants.PUBLIC_CLOSE_RESPONSE:
			return new SmlPublicCloseResponse();
			break;
			
		case Constants.GET_PROFILE_PACK_REQUEST:
			return new SmlGetProfilePackRequest();
			break;
			
		case Constants.GET_PROFILE_PACK_RESPONSE:
			return new SmlGetProfilePackResponse();
			break;
			
		case Constants.GET_PROFILE_LIST_REQUEST:
			return new SmlGetProfileListRequest();
			break;
			
		case Constants.GET_PROFILE_LIST_RESPONSE:
			return new SmlGetProfileListResponse();
			break;
			
		case Constants.GET_PROC_PARAMETER_REQUEST:
			return new SmlGetProcParameterRequest();
			break;
			
		case Constants.GET_PROC_PARAMETER_RESPONSE:
			return new SmlGetProcParameterResponse();
			break;
			
		case Constants.SET_PROC_PARAMETER_REQUEST:
			return new SmlSetProcParameterRequest();
			break;
			
		case Constants.SET_PROC_PARAMETER_RESPONSE:
			return new SmlSetProcParameterResponse();
			break;
			
		case Constants.GET_LIST_REQUEST:
			return new SmlGetListRequest();
			break;
			
		case Constants.GET_LIST_RESPONSE:
			return new SmlGetListResponse();
			break;
			
		case Constants.ATTENTION_RESPONSE:
			return new SmlAttentionResponse();
			break;
		
		default:
	        return undefined;
	};
};

SmlMessageBody.parse = function parse(smlBuffer, messageTag) {
	
	switch(messageTag) {
	case Constants.PUBLIC_OPEN_REQUEST:
		return SmlPublicOpenRequest.parse(smlBuffer);
		break;
		
	case Constants.PUBLIC_OPEN_RESPONSE:
		return SmlPublicOpenResponse.parse(smlBuffer);
		break;
		
	case Constants.PUBLIC_CLOSE_REQUEST:
		return SmlPublicCloseRequest.parse(smlBuffer);
		break;
		
	case Constants.PUBLIC_CLOSE_RESPONSE:
		return SmlPublicCloseResponse.parse(smlBuffer);
		break;
		
	case Constants.GET_PROFILE_PACK_REQUEST:
		return SmlGetProfilePackRequest.parse(smlBuffer);
		break;
		
	case Constants.GET_PROFILE_PACK_RESPONSE:
		return SmlGetProfilePackResponse.parse(smlBuffer);
		break;
		
	case Constants.GET_PROFILE_LIST_REQUEST:
		return SmlGetProfileListRequest.parse(smlBuffer);
		break;
		
	case Constants.GET_PROFILE_LIST_RESPONSE:
		return SmlGetProfileListResponse.parse(smlBuffer);
		break;
		
	case Constants.GET_PROC_PARAMETER_REQUEST:
		return SmlGetProcParameterRequest.parse(smlBuffer);
		break;
		
	case Constants.GET_PROC_PARAMETER_RESPONSE:
		return SmlGetProcParameterResponse.parse(smlBuffer);
		break;
		
	case Constants.SET_PROC_PARAMETER_REQUEST:
		return SmlSetProcParameterRequest.parse(smlBuffer);
		break;
		
	case Constants.SET_PROC_PARAMETER_RESPONSE:
		return SmlSetProcParameterResponse.parse(smlBuffer);
		break;
		
	case Constants.GET_LIST_REQUEST:
		return SmlGetListRequest.parse(smlBuffer);
		break;
		
	case Constants.GET_LIST_RESPONSE:
		return SmlGetListResponse.parse(smlBuffer);
		break;
		
	case Constants.ATTENTION_RESPONSE:
		return SmlAttentionResponse.parse(smlBuffer);
		break;
		
	 default:
        return undefined;
	};
};

module.exports = SmlMessageBody;
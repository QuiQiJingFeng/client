/**
 * Simple example of a C++ class that can be binded using the
 * automatic script generator
 */


#import <Foundation/Foundation.h>
#include "PlatformSDK.h"


PlatformSDK* PlatformSDK:: _instance = NULL;

PlatformSDK::~PlatformSDK(){
}

PlatformSDK* PlatformSDK::getInstance()
{
    if(_instance == NULL){
        _instance = new PlatformSDK();
    }
    return _instance;
}

void PlatformSDK::distroyInstance()
{
    if(_instance){
        delete _instance;
        _instance = NULL;
    }
}

void PlatformSDK::excuteFunc(std::string json_params)
{
    JSONManager manager;
    manager.parseValueMapFromJSON(json_params);
    auto param_array = manager.getDataVector();
    std::string action = param_array[0].asString();
    if(action.compare("OPENURL") == 0){
        NSString *msg = [NSString stringWithCString:url encoding:NSASCIIStringEncoding];
        NSURL * nsUrl = [NSURL URLWithString:msg];
        [[UIApplication sharedApplication] openURL:nsUrl];
    }
    
}

void PlatformSDK::setCallBack(std::shared_ptr<JSFunctionWrapper> call_back)
{
    this->_callFunc = call_back;
}
//OC CALL BACK 参数 [param1,param2,param3] example=> "[2342,\"AK47\",true]"
void PlatformSDK::specailExeCallBack(std::string json_params)
{
    ScriptingCore *engine = ScriptingCore::getInstance();
    JSContext *cx = engine->getGlobalContext();
    JS::RootedObject jstarget(cx, engine->getGlobalObject());
    
    JSONManager manager;
    manager.parseValueMapFromJSON(json_params);
    auto param_array = manager.getDataVector();
    int size = (int)param_array.size();
    jsval* largv = new jsval[size];
    for (int idx =0; idx < size; idx ++) {
        cocos2d::Value value = param_array[idx];
        switch(value.getType()){
            case cocos2d::Value::Type::BOOLEAN :{
                largv[idx] = BOOLEAN_TO_JSVAL(value.asBool());
            }break;
            case cocos2d::Value::Type::STRING :{
                largv[idx] = std_string_to_jsval(cx,value.asString());
            }break;
            case cocos2d::Value::Type::INTEGER :{
                largv[idx] = int32_to_jsval(cx, value.asInt());
            }break;
            case cocos2d::Value::Type::DOUBLE :{
                
                largv[idx] = DOUBLE_TO_JSVAL(value.asDouble());
            }break;
            case cocos2d::Value::Type::FLOAT :{
                largv[idx] = DOUBLE_TO_JSVAL(value.asDouble());
            }break;
            
            default:{
                printf("FYD WARNING: PlatformSDK::specailExeCallBack has unsuport type\n");
            }break;
        }
    }
    
    JS::RootedValue rval(cx);
    bool succeed = this->_callFunc->invoke(JS::HandleValueArray::fromMarkedLocation(size, largv), &rval);
    if (!succeed && JS_IsExceptionPending(cx)) {
        JS_ReportPendingException(cx);
    }

}




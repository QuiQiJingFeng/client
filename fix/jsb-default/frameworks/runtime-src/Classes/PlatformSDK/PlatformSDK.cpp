/**
 * Simple example of a C++ class that can be binded using the
 * automatic script generator
 */

#include "PlatformSDK.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni/JniHelper.h>
#include <jni.h>
#include "AppDelegate.h"

#ifdef __cplusplus
extern "C" {
#endif
//回调
JNIEXPORT void JNICALL Java_com_fyd_PlatformSDK_specailExeCallBack(JNIEnv *env, jclass clz, jstring json_param) {
   
   std::string result_str = env->GetStringUTFChars(json_param, NULL);
   cocos2d::Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]{
       PlatformSDK::getInstance()->specailExeCallBack(result_str);
   });
}
   
#ifdef __cplusplus
}
#endif

#endif

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
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
   cocos2d::JniMethodInfo mi;
   bool isHave = cocos2d::JniHelper::getStaticMethodInfo(mi, "com/fyd/PlatformSDK", "excuteFunc", "(Ljava/lang/String;)V");
   if (isHave)
   {
       jstring jsparam = mi.env->NewStringUTF(json_params.c_str());
       //调用此函数
       mi.env->CallStaticVoidMethod(mi.classID, mi.methodID, jsparam);
       
       mi.env->DeleteLocalRef(jsparam);
   }
   else
   {
       CCLOG("com/mu77/aam/PlatformSDK excuteFunc not found");
   }
#endif
}

void PlatformSDK::setCallBack(std::shared_ptr<JSFunctionWrapper> call_back)
{
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
    this->_callFunc = call_back;
#endif
}

void PlatformSDK::specailExeCallBack(std::string json_params)
{
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
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
#endif
}

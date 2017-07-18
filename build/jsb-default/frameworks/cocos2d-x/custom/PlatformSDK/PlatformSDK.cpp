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
   bool isHave = cocos2d::JniHelper::getStaticMethodInfo(mi, "com/mu77/aam/PlatformSDK", "excuteFunc", "(Ljava/lang/String;)V");
   if (isHave)
   {
       jstring jsparam = mi.env->NewStringUTF(json_params);
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
    this->_callFunc = call_back;
}

void PlatformSDK::specailExeCallBack(std::string json_params)
{
}

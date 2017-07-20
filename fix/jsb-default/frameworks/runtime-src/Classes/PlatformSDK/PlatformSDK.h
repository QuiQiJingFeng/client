#ifndef __PLATFORM__SDK__
#define __PLATFORM__SDK__

#include <string>
#include <stdint.h>
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "JSONManager.h"

class PlatformSDK
{
private:
    static PlatformSDK* _instance;
    //回调方法
    std::shared_ptr<JSFunctionWrapper> _callFunc;
public:
    static PlatformSDK* getInstance();
    void distroyInstance();
    ~PlatformSDK();

public:
    void excuteFunc(std::string json_params);
    void setCallBack(std::shared_ptr<JSFunctionWrapper> call_back);
    void specailExeCallBack(std::string json_params);
};

#endif

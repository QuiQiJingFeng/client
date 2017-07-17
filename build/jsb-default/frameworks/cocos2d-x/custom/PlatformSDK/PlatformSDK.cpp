/**
 * Simple example of a C++ class that can be binded using the
 * automatic script generator
 */

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

void PlatformSDK::excuteFunc(const char* param)
{
    printf("FYD====>>>%s\n",param);
}

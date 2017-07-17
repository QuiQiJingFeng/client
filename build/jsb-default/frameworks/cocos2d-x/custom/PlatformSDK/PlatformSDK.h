#ifndef __PLATFORM__SDK__
#define __PLATFORM__SDK__

#include <string>
#include <stdint.h>
 
class PlatformSDK
{
private:
    PlatformSDK();
private:
    static PlatformSDK* _instance;
public:
   PlatformSDK* getInstance();
   void distroyInstance();
   ~PlatformSDK();

public:
   void excuteFunc(const char* param);
};

#endif

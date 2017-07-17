#ifndef __PLATFORM__SDK__
#define __PLATFORM__SDK__

#include <string>
#include <stdint.h>
 
class PlatformSDK
{
private:
    static PlatformSDK* _instance;
public:
   static PlatformSDK* getInstance();
   void distroyInstance();
   ~PlatformSDK();

public:
   void excuteFunc(const char* param);
};

#endif

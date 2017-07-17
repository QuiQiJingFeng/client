#include "base/ccConfig.h"
#ifndef __custom_h__
#define __custom_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_PlatformSDK_class;
extern JSObject *jsb_PlatformSDK_prototype;

bool js_custom_PlatformSDK_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_custom_PlatformSDK_finalize(JSContext *cx, JSObject *obj);
void js_register_custom_PlatformSDK(JSContext *cx, JS::HandleObject global);
void register_all_custom(JSContext* cx, JS::HandleObject obj);
bool js_custom_PlatformSDK_distroyInstance(JSContext *cx, uint32_t argc, jsval *vp);
bool js_custom_PlatformSDK_excuteFunc(JSContext *cx, uint32_t argc, jsval *vp);
bool js_custom_PlatformSDK_getInstance(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __custom_h__

#include "jsb_custom_auto.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "PlatformSDK.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}
JSClass  *jsb_PlatformSDK_class;
JSObject *jsb_PlatformSDK_prototype;

bool js_custom_PlatformSDK_distroyInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    PlatformSDK* cobj = (PlatformSDK *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_PlatformSDK_distroyInstance : Invalid Native Object");
    if (argc == 0) {
        cobj->distroyInstance();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_custom_PlatformSDK_distroyInstance : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
//argc =>arg count 参数的数量
//vp => JS:Value * 指向参数数组的指针
bool js_custom_PlatformSDK_excuteFunc(JSContext *cx, uint32_t argc, jsval *vp)
{
    //根据vp/argc将所有的参数获取并放到args中  ,通过get(idx)可以获取到对应的参数
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    PlatformSDK* cobj = (PlatformSDK *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_PlatformSDK_excuteFunc : Invalid Native Object");

    std::string json = "";
    char temp[256];
    if(argc > 0){
        for (int idx = 0; idx< argc; idx++) {
            JS::HandleValue param = args.get(idx);
            if(param.isString()){
                JSStringWrapper str(param.toString());
                std::string arg = str.get();
                sprintf(temp,"\"%s\",",arg.c_str());
                json += std::string(temp);
            }else if(param.isInt32()){
                int arg = param.toInt32();
                sprintf(temp,"%d",arg);
                json += std::string(temp);
            }
            else if(param.isNumber()) {
                double arg = param.toNumber();
                sprintf(temp,"%f",arg);
                json += std::string(temp);
            }else if(param.isBoolean()) {
                bool arg = param.toBoolean();
                std::string result;
                if(arg){
                    result = "true";
                }else{
                    result = "false";
                }
                sprintf(temp,"%s,",result.c_str());
                json += std::string(temp);
            }else if(JS_TypeOfValue(cx, param) == JSTYPE_FUNCTION){
                JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
                std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(idx), args.thisv()));
                PlatformSDK::getInstance()->setCallBack(func);
                sprintf(temp,"%s,","FUNC");
                json += std::string(temp);
            }
        }
    }
    json = "["+json+"]";
    cobj->excuteFunc(json);
    args.rval().setUndefined();
    
    return true;
}
bool js_custom_PlatformSDK_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        PlatformSDK* ret = PlatformSDK::getInstance();
        jsval jsret = JSVAL_NULL;
        if (ret) {
        jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<PlatformSDK>(cx, (PlatformSDK*)ret));
    } else {
        jsret = JSVAL_NULL;
    };
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_custom_PlatformSDK_getInstance : wrong number of arguments");
    return false;
}


void js_register_custom_PlatformSDK(JSContext *cx, JS::HandleObject global) {
    jsb_PlatformSDK_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_PlatformSDK_class->name = "PlatformSDK";
    jsb_PlatformSDK_class->addProperty = JS_PropertyStub;
    jsb_PlatformSDK_class->delProperty = JS_DeletePropertyStub;
    jsb_PlatformSDK_class->getProperty = JS_PropertyStub;
    jsb_PlatformSDK_class->setProperty = JS_StrictPropertyStub;
    jsb_PlatformSDK_class->enumerate = JS_EnumerateStub;
    jsb_PlatformSDK_class->resolve = JS_ResolveStub;
    jsb_PlatformSDK_class->convert = JS_ConvertStub;
    jsb_PlatformSDK_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("distroyInstance", js_custom_PlatformSDK_distroyInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("excuteFunc", js_custom_PlatformSDK_excuteFunc, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("getInstance", js_custom_PlatformSDK_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    jsb_PlatformSDK_prototype = JS_InitClass(
        cx, global,
        JS::NullPtr(),
        jsb_PlatformSDK_class,
        dummy_constructor<PlatformSDK>, 0, // no constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_PlatformSDK_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "PlatformSDK"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::FalseHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<PlatformSDK>(cx, jsb_PlatformSDK_class, proto, JS::NullPtr());
}

void register_all_custom(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "cc", &ns);

    js_register_custom_PlatformSDK(cx, ns);
}


package com.fyd;

import android.app.Activity;
import android.util.Log;

import org.cocos2dx.lib.Cocos2dxActivity;

/**
 * Created by mu77 on 17/7/18.
 */
public class PlatformSDK {
    private static Cocos2dxActivity _cocosActivity;


    public native static void specailExeCallBack(String json_param);

    //set activity
    public static void init(Activity activity) {
        _cocosActivity = (Cocos2dxActivity)activity;
    }

    public static void excuteFunc(String json_param) {
        Log.d("TEST","FYD======"+json_param);
        PlatformSDK.specailExeCallBack(json_param);
    }
}

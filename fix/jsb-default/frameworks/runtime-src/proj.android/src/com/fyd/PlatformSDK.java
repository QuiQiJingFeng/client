package com.fyd;

import android.app.Activity;
import android.util.Log;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.json.JSONArray;
import org.json.JSONException;


/**
 * Created by mu77 on 17/7/18.
 */
public class PlatformSDK {
    private static Cocos2dxActivity _cocosActivity;
    private static String TAG = "FYD";


    public native static void specailExeCallBack(String json_param);

    //set activity
    public static void init(Activity activity) {
        _cocosActivity = (Cocos2dxActivity)activity;
    }

    public static void excuteFunc(String json_param) {
    	try{
    		JSONArray array = new JSONArray(json_param);
    		String action = array.getString(0);
    		Log.d(TAG,action);
    		
    	}catch(JSONException e){
    		Log.e(TAG,e.toString());
    	}
    	 
        
    }
}

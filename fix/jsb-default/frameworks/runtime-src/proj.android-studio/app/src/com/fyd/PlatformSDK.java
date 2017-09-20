package com.fyd;

import android.app.Activity;
import android.util.Log;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Intent;
import android.net.Uri;
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
        try{
            JSONArray array = new JSONArray(json_param);
            String action = array.getString(0);
            switch (action) {
                case "OPENURL" :{
                    String url = array.getString(1);
                    openURL(url);
                }
                break;
                
            }

            
        }catch(JSONException e){
            Log.e("FYD",e.toString());
        }
    }

    public static void openURL(String url) {
        try {
            Uri uri = Uri.parse(url);
            Intent it = new Intent(Intent.ACTION_VIEW, uri);
            _cocosActivity.startActivity(it);
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
}

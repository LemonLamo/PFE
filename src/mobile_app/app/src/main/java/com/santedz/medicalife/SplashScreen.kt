package com.santedz.medicalife

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Window
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity


class SplashScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        getWindow().statusBarColor = getResources().getColor(R.color.bgColor2)

        Handler(Looper.getMainLooper()).postDelayed({
            val i = Intent(this@SplashScreen, OnboardingActivity::class.java);
            startActivity(i);
            finish()
        }, 3000)
    }
}
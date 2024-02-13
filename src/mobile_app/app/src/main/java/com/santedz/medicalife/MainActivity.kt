package com.santedz.medicalife

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun logInButton(v: View?){
        val i = Intent(this, LoginActivity::class.java);
        startActivity(i);
        finish()
    }
    fun signUpButton(v: View?){
        val i = Intent(this, SignUpActivity::class.java);
        startActivity(i);
        finish()
    }
}
package com.santedz.medicalife

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
    }
    fun login(v: View?){
        //TODO: replace this with login logic
        val i = Intent(this, HomeActivity::class.java);
        startActivity(i);
        finish()
    }
    fun gotoForgotPassword(v: View?){
        //TODO: haven't done this yet
    }
    fun gotoSignup(v: View?){
        val i = Intent(this, SignUpActivity::class.java);
        startActivity(i);
        finish()
    }
}
package com.santedz.medicalife

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)
    }
    fun signUp(v: View?){
        //TODO: replace this with sign up logic
        val i = Intent(this, HomeActivity::class.java);
        startActivity(i);
        finish()
    }
    fun gotoLogin(v: View?){
        val i = Intent(this, LoginActivity::class.java);
        startActivity(i);
        finish()
    }

}
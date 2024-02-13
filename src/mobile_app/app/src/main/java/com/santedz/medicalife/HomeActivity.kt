package com.santedz.medicalife

import android.app.Dialog
import android.content.Intent
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.view.View
import androidx.annotation.Nullable
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.textfield.TextInputEditText
import com.santedz.medicalife.databinding.ActivityHomeBinding
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;


class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding
    private lateinit var dialog : Dialog

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_activity_home)
        navView.setupWithNavController(navController)
    }

    fun openGrantAccessDialog(v: View?){
        // create a Dialog component
        dialog = Dialog(this)
        dialog.setContentView(R.layout.dialog_grant_access)
        dialog.findViewById<View>(R.id.grantButton).setOnClickListener({
            //TODO: Write grant logic
            dialog.dismiss()
        })
        dialog.findViewById<View>(R.id.cancelButton).setOnClickListener({
            dialog.dismiss()
        })

        dialog.show()
    }
    fun openRevokeAccessDialog(v: View?){
        // create a Dialog component
        dialog = Dialog(this)
        dialog.setContentView(R.layout.dialog_revoke_access)
        dialog.findViewById<View>(R.id.revokeButton).setOnClickListener({
            //TODO: Write revoke logic
            dialog.dismiss()
        })
        dialog.findViewById<View>(R.id.cancelButton).setOnClickListener({
            dialog.dismiss()
        })

        dialog.show()
    }

    fun scanButton(v: View?){
        val intentIntegrator = IntentIntegrator(this@HomeActivity)
        intentIntegrator.setPrompt("Scan a QR Code")
        intentIntegrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE)
        intentIntegrator.initiateScan()
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val intentResult: IntentResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        if (intentResult == null)
            return super.onActivityResult(requestCode, resultCode, data)

        val contents: String = intentResult.getContents()
        if (contents == null)
            return super.onActivityResult(requestCode, resultCode, data)

        // Handle NIN
        dialog.findViewById<TextInputEditText>(R.id.doctorNINField).setText(intentResult.getContents())
    }
}